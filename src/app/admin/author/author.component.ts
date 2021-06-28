import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthorModel } from 'src/app/models/author-model';
import { AuthorService } from 'src/app/services/author.service';
import { BaseService } from 'src/app/services/base.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { CreateAuthorComponent } from 'src/app/shared/create-author/create-author.component';
import { UpdateAuthorComponent } from 'src/app/shared/update-author/update-author.component';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent extends BaseService implements OnInit {

  public authors: AuthorModel[] = [];

  public author!: AuthorModel;

  displayedColumns: string[] = ['position', 'name', 'website', 'createdDate', 'updatedDate', 'status', 'controls'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  authorSource: MatTableDataSource<AuthorModel> = new MatTableDataSource<AuthorModel>([]);


  constructor(private _authorService: AuthorService,
    public snackBar: MatSnackBar,
    public route: Router,
    private _matdialog: MatDialog,
  ) {
    super(snackBar, route)

    this.getAuthor()
  }

  ngOnInit() {
  }

  // Lấy danh sách tác giả
  public getAuthor() {
    this._authorService.getAuthor().subscribe((authors: any) => {
      this.authors = authors.data;
      this.setAuthorSource(this.authors);
    }, (error) => {
      this.openSnackBar(error);
    })
  }


  // Xoá độc giả
  public openconfirmDialog(id: string) {
    const dialogRef = this._matdialog.open(ConfirmComponent).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this._authorService.deleteAuthor(id).subscribe((response: any) => {
        this.openSnackBar("Xoá thành công");
        this.getAuthor()
      }, (error) => {
        this.openSnackBar(error);
      });

    });

  }


  // Phân trang
  public setAuthorSource(authors: AuthorModel[]) {
    this.authorSource = new MatTableDataSource<AuthorModel>(authors);
    this.authorSource.paginator = this.paginator;
  }

  // Thêm tác giả
  public openCreateDialog() {
    this._matdialog.open(CreateAuthorComponent).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getAuthor()

    });

  }

  // Cập nhật tác giả

  public openUpdateAuthorDialog(author: AuthorModel) {
    this._matdialog.open(UpdateAuthorComponent,
      {
        data: {
          author: author
        }
      }
    ).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getAuthor()

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.authorSource.filter = filterValue.trim().toLowerCase();
  }

}

