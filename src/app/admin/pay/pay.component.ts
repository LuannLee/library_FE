import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BorowModel } from 'src/app/models/borow-model';
import { PayModel } from 'src/app/models/pay-model';
import { BaseService } from 'src/app/services/base.service';
import { BorrowService } from 'src/app/services/borrow.service';
import { PayService } from 'src/app/services/pay.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { CreateBorrowComponent } from 'src/app/shared/create-borrow/create-borrow.component';
import { CreatePayComponent } from 'src/app/shared/create-pay/create-pay.component';
import { UpdateBorrowComponent } from 'src/app/shared/update-borrow/update-borrow.component';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent extends BaseService implements OnInit {

  public pays: PayModel[] = [];

  displayedColumns: string[] = ['position',  'status', 'borrowName', 'payDate', 'controls'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  paySource: MatTableDataSource<PayModel> = new MatTableDataSource<PayModel>([]);


  constructor(private _payService: PayService,
    public snackBar: MatSnackBar,
    public route: Router,
    private _matdialog: MatDialog,
  ) {
    super(snackBar, route)

    this.getPay()
  }

  ngOnInit() {
  }

  public getPay() {
    this._payService.getPay().subscribe((authors: any) => {
      this.pays = authors.data;
      this.setPaySource(this.pays);
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
      this._payService.deletePay(id).subscribe((response: any) => {
        this.openSnackBar("Xoá thành công");
        this.getPay()
      }, (error) => {
        this.openSnackBar(error);
      });

    });

  }


  // Phân trang
  public setPaySource(pays: PayModel[]) {
    this.paySource = new MatTableDataSource<PayModel>(pays);
    this.paySource.paginator = this.paginator;
  }

  // Thêm tác giả
  public openCreateDialog() {
    this._matdialog.open(CreatePayComponent).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getPay()

    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paySource.filter = filterValue.trim().toLowerCase();
  }

}
