import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/models/book-model';
import { BorrowDetail } from 'src/app/models/borrowDetail';
import { ReaderModel } from 'src/app/models/reader-model';
import { BaseService } from 'src/app/services/base.service';
import { BookService } from 'src/app/services/book.service';
import { BorrowService } from 'src/app/services/borrow.service';
import { ReaderService } from 'src/app/services/reader.service';
import { CreateBookComponent } from '../create-book/create-book.component';

@Component({
  selector: 'app-create-borrow',
  templateUrl: './create-borrow.component.html',
  styleUrls: ['./create-borrow.component.scss']
})
export class CreateBorrowComponent extends BaseService implements OnInit {

  public readers: ReaderModel[] = [];
  public books: BookModel[] = [];
  public borrowDetails: BorrowDetail[] = [];

  public borrowDetail: BorrowDetail = new BorrowDetail();

  public listBorrowDetail : any;

  public borrowForm: FormGroup = new FormGroup({});

  constructor(
    public snackBar: MatSnackBar,
    public route: Router,
    private _readerService: ReaderService,
    private _borrowService: BorrowService,
    private _bookService: BookService,
    public dialogRef: MatDialogRef<CreateBorrowComponent>
  ) { super(snackBar, route) }

  ngOnInit() {
    this.getReader();
    this.getBook();

    this.borrowForm = new FormGroup(
      {
        readerId: new FormControl('', [Validators.required]),
        payDate: new FormControl('', [Validators.required]),
        borrowDetail: new FormControl(),
      }
    );
  }

  public getReader() {
    this._readerService.getReader().subscribe((readers: any) => {
      this.readers = readers.data;
    }, (error) => {
      this.openSnackBar(error);
    })
  }

  public getBook() {
    this._bookService.getBook().subscribe((books: any) => {
      this.books = books.data;
    }, (error) => {
      this.openSnackBar(error);
    })
  }


  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {

    if (!this.borrowForm.valid)
      return;

    let borrow = this.borrowForm.value;
    borrow.borrowDetail = this.listBorrowDetail;


    this._borrowService.createBorrow(borrow).subscribe((response: any) => {
      this.openSnackBar("Thêm thẻ mượn thành công");
      this.dialogRef.close(true);
    }, (error) => {
      this.openSnackBar(error);
    })
  }

  public AddBorrowDetail() {
    if (this.borrowDetail != null) {
      this.borrowDetails.push(new BorrowDetail());
    }
    this.listBorrowDetail = this.borrowDetails;
  }

  public DeleteBorrowdetail() {
    this.borrowDetails.pop();
  }
}
