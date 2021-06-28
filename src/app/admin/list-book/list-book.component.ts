import {AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/models/book-model';
import { PublishCompanyModel } from 'src/app/models/publishCompany-model';
import { ReaderModel } from 'src/app/models/reader-model';
import { BaseService } from 'src/app/services/base.service';
import { BookService } from 'src/app/services/book.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { CreateBookComponent } from 'src/app/shared/create-book/create-book.component';
import { UpdateBookComponent } from 'src/app/shared/update-book/update-book.component';
import { UpdateReaderComponent } from 'src/app/shared/update-reader/update-reader.component';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent extends BaseService implements OnInit {

  public books: BookModel[] = [];


  public companies: PublishCompanyModel[] = [];

  displayedColumns: string[] = ['position', 'name', 'year','author','category','company','quantity',  'status', 'controls'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  bookSource: MatTableDataSource<BookModel> = new MatTableDataSource<BookModel>([]);


  constructor(private _bookService: BookService,
    public snackBar: MatSnackBar,
    public route: Router,
    private _matdialog: MatDialog,
  ) {
    super(snackBar, route)

    this.getBook();
  }

  ngOnInit() {
  }

  // Lấy danh sách độc giả
  public getBook() {
    this._bookService.getBook().subscribe((books: any) => {
      console.log(books.data)
      this.books = books.data;
      this.setBookSource(this.books);
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
      this._bookService.deleteBook(id).subscribe((response: any) => {
        this.openSnackBar("Xoá thành công");
        this.getBook()
      }, (error) => {
        this.openSnackBar(error);
      });

    });

  }


  // Phân trang
  public setBookSource(books: BookModel[]) {
    this.bookSource = new MatTableDataSource<BookModel>(books);
    this.bookSource.paginator = this.paginator;
  }

  // Thêm độc giả
  public openCreateDialog() {
    this._matdialog.open(CreateBookComponent).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getBook()

    });

  }

  // Cập nhật độc giả

  public openUpdateReaderDialog(book: BookModel) {
    this._matdialog.open(UpdateBookComponent,
      {
        data: {
          book: book
        }
      }
    ).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getBook()

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bookSource.filter = filterValue.trim().toLowerCase();
  }
}

