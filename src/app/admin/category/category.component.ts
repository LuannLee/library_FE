import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model';
import { ReaderModel } from 'src/app/models/reader-model';
import { BaseService } from 'src/app/services/base.service';
import { CategoryService } from 'src/app/services/category.service';
import { ReaderService } from 'src/app/services/reader.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { CreateCategoryComponent } from 'src/app/shared/create-category/create-category.component';
import { CreateReaderComponent } from 'src/app/shared/createReader/createReader.component';
import { UpdateCategoryComponent } from 'src/app/shared/update-category/update-category.component';
import { UpdateReaderComponent } from 'src/app/shared/update-reader/update-reader.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends BaseService implements OnInit {

  public categories: CategoryModel[] = [];

  public category!: CategoryModel;

  displayedColumns: string[] = ['position', 'name', 'createdDate', 'updatedDate', 'status', 'controls'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categorySource: MatTableDataSource<CategoryModel> = new MatTableDataSource<CategoryModel>([]);


  constructor(private _categoryService: CategoryService,
    public snackBar: MatSnackBar,
    public route: Router,
    private _matdialog: MatDialog,
  ) {
    super(snackBar, route)

    this.getCategory()
  }

  ngOnInit() {
  }

  // Lấy danh sách độc giả
  public getCategory() {
    this._categoryService.getCategory().subscribe((category: any) => {
      this.categories = category.data;
      this.setCategorySource(this.categories);
    }, (error) => {
      this.openSnackBar(error);
    })
  }


  // Xoá độc giả
  public openconfirmDialog(id: string) {
    this._matdialog.open(ConfirmComponent).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this._categoryService.deleteCategory(id).subscribe((response: any) => {
        this.openSnackBar("Xoá thành công");
        this.getCategory()
      }, (error) => {
        this.openSnackBar(error);
      });

    });

  }


  // Phân trang
  public setCategorySource(categories: CategoryModel[]) {
    this.categorySource = new MatTableDataSource<CategoryModel>(categories);
    this.categorySource.paginator = this.paginator;
  }

  // Thêm độc giả
  public openCreateDialog() {
    this._matdialog.open(CreateCategoryComponent, {width:'400px', height:'240px'}).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getCategory()

    });

  }

  // Cập nhật độc giả

  public openUpdateCategoryDialog(category: CategoryModel) {
    this._matdialog.open(UpdateCategoryComponent,
      {
        data: {
          category: category
        }
      }
    ).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getCategory()

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categorySource.filter = filterValue.trim().toLowerCase();
  }

}

