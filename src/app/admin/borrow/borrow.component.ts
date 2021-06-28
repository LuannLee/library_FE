import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthorModel } from 'src/app/models/author-model';
import { BorowModel } from 'src/app/models/borow-model';
import { CountBorrow } from 'src/app/models/count-borrow';
import { AuthorService } from 'src/app/services/author.service';
import { BaseService } from 'src/app/services/base.service';
import { BorrowService } from 'src/app/services/borrow.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { CreateAuthorComponent } from 'src/app/shared/create-author/create-author.component';
import { CreateBorrowComponent } from 'src/app/shared/create-borrow/create-borrow.component';
import { UpdateAuthorComponent } from 'src/app/shared/update-author/update-author.component';
import { UpdateBorrowComponent } from 'src/app/shared/update-borrow/update-borrow.component';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.scss']
})
export class BorrowComponent extends BaseService implements OnInit {

  public borows: BorowModel[] = [];
  public countBorrow!: CountBorrow;

  displayedColumns: string[] = ['position',  'status','borrowName', 'readerId','borrowDate', 'payDate', 'controls'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  borrowSource: MatTableDataSource<BorowModel> = new MatTableDataSource<BorowModel>([]);


  constructor(private _borrowService: BorrowService,
    public snackBar: MatSnackBar,
    public route: Router,
    private _matdialog: MatDialog,
  ) {
    super(snackBar, route)

    this.getBorow()
    this.getCountBorrow();
  }

  ngOnInit() {
  }

  public getBorow() {
    this._borrowService.getBorrow().subscribe((authors: any) => {
      this.borows = authors.data;
      this.setBorrowSource(this.borows);
    }, (error) => {
      this.openSnackBar(error);
    })
  }

  public getCountBorrow(){
    this._borrowService.getCountBorrow().subscribe((response: any) => {
      this.countBorrow = response.data;
    },(error)  => {
      this.openSnackBar(error);
    })
  }


  // Xoá độc giả
  public openconfirmDialog(id: string) {
    const dialogRef = this._matdialog.open(ConfirmComponent).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this._borrowService.deleteBorrow(id).subscribe((response: any) => {
        this.openSnackBar("Xoá thành công");
        this.getBorow();
        this.getCountBorrow();
      }, (error) => {
        this.openSnackBar(error);
      });

    });

  }


  // Phân trang
  public setBorrowSource(borrows: BorowModel[]) {
    this.borrowSource = new MatTableDataSource<BorowModel>(borrows);
    this.borrowSource.paginator = this.paginator;
  }

  // Thêm tác giả
  public openCreateDialog() {
    this._matdialog.open(CreateBorrowComponent).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getBorow()
      this.getCountBorrow();

    });

  }

  // Cập nhật tác giả

  public openUpdateAuthorDialog(borrow: BorowModel) {
    this._matdialog.open(UpdateBorrowComponent,
      {
        data: {
          borrow: borrow
        }
      }
    ).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getBorow()
      this.getCountBorrow();

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.borrowSource.filter = filterValue.trim().toLowerCase();
  }

}

