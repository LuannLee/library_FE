import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BorowModel } from 'src/app/models/borow-model';
import { BaseService } from 'src/app/services/base.service';
import { BorrowService } from 'src/app/services/borrow.service';
import { PayService } from 'src/app/services/pay.service';

@Component({
  selector: 'app-create-pay',
  templateUrl: './create-pay.component.html',
  styleUrls: ['./create-pay.component.scss']
})
export class CreatePayComponent extends BaseService implements OnInit {

  public borrows: BorowModel[] = [];

  public payForm: FormGroup = new FormGroup({});

  constructor(
    public snackBar: MatSnackBar,
    public route: Router,
    private _payService : PayService,
    private _borrowService: BorrowService,
    public dialogRef: MatDialogRef<CreatePayComponent>
  ) { super(snackBar, route) }

  ngOnInit() {
    this.getBorow();

    this.payForm = new FormGroup(
      {
        borrowId: new FormControl('', [Validators.required]),
      }
    );
  }

  public getBorow() {
    this._borrowService.getBorrowByStatus().subscribe((borrows: any) => {
      this.borrows = borrows.data;
    }, (error) => {
      this.openSnackBar(error);
    })
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {

    if (!this.payForm.valid)
      return;

    let pay = this.payForm.value;

    this._payService.createPay(pay).subscribe((response: any) => {
      this.openSnackBar("Thêm thẻ trả thành công");
      this.dialogRef.close(true);
    }, (error) => {
      this.openSnackBar(error);
    })
  }
}
