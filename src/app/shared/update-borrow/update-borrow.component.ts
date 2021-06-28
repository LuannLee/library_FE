import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/models/book-model';
import { BorowModel } from 'src/app/models/borow-model';
import { BorrowDetail } from 'src/app/models/borrowDetail';
import { ReaderModel } from 'src/app/models/reader-model';
import { BaseService } from 'src/app/services/base.service';
import { BookService } from 'src/app/services/book.service';
import { BorrowService } from 'src/app/services/borrow.service';
import { ReaderService } from 'src/app/services/reader.service';


@Component({
  selector: 'app-update-borrow',
  templateUrl: './update-borrow.component.html',
  styleUrls: ['./update-borrow.component.scss']
})
export class UpdateBorrowComponent extends BaseService implements OnInit {

  public borrow: BorowModel = new BorowModel();

  public borrowDetailForUpdate: BorrowDetail = new BorrowDetail();

  public readers: ReaderModel[] = [];
  public books: BookModel[] = [];
  public borrowDetails: BorrowDetail[] = [];

  public borrowDetail: BorrowDetail = new BorrowDetail();

  public listBorrowDetail : any;


  public borrowForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public route: Router,
    private _readerService: ReaderService,
    private _borrowService: BorrowService,
    private _bookService: BookService,

    public dialogRef: MatDialogRef<UpdateBorrowComponent>
  ) { super(snackBar, route) }

  ngOnInit() {
    this.getReader();
    this.getBook();


    let borrow = JSON.parse(JSON.stringify(this.data.borrow));

    this.borrow = borrow;

    this.getBorrowDetailByBorrow();

    this.borrowForm = new FormGroup(
      {
        readerId: new FormControl(this.data.borrow.readerId, [Validators.required]),
        payDate: new FormControl(this.data.borrow.payDate, [Validators.required]),
        status : new FormControl(this.data.borrow.status, [Validators.required]),
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

  public getBorrowDetailByBorrow(){
    this._borrowService.getBorrowDetailByBorrow(this.borrow).subscribe((response: any) =>{
      this.borrowDetails = response.data;
      console.log(this.borrowDetails);

      this.borrowDetails.forEach(element => {
        this.borrowDetailForUpdate.bookId = element.bookId;
        this.borrowDetailForUpdate.quantity = element.quantity;
      });
      this.listBorrowDetail = this.borrowDetails;
    },(error) => {
      this.openSnackBar(error);
    });
  }





  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {
    if (!this.borrowForm.valid)
    return;

    let borrow = this.borrowForm.value;
    borrow.id = this.borrow.id;
    borrow.status =  borrow.status ? 1 : 0;
    borrow.borrowDetail = this.listBorrowDetail;

    this._borrowService.updateBorrow(borrow).subscribe((response: any) => {
      this.openSnackBar("Cập nhật thẻ mượn thành công");
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
