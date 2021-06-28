import { Component, OnInit, ViewChild } from '@angular/core';
import { ReaderModel } from 'src/app/models/reader-model';
import { ReaderService } from 'src/app/services/reader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/services/base.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateReaderComponent } from 'src/app/shared/createReader/createReader.component';
import { UpdateReaderComponent } from 'src/app/shared/update-reader/update-reader.component';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent extends BaseService implements OnInit {

  public readers: ReaderModel[] = [];

  public reader!: ReaderModel;

  displayedColumns: string[] = ['position', 'name', 'address', 'createdDate', 'updatedDate', 'status', 'controls'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readerSource: MatTableDataSource<ReaderModel> = new MatTableDataSource<ReaderModel>([]);


  constructor(private _readerService: ReaderService,
    public snackBar: MatSnackBar,
    public route: Router,
    private _matdialog: MatDialog,
  ) {
    super(snackBar, route)

    this.getReader()
  }

  ngOnInit() {
  }

  // Lấy danh sách độc giả
  public getReader() {
    this._readerService.getReader().subscribe((readers: any) => {
      this.readers = readers.data;
      this.setReaderSource(this.readers);
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
      this._readerService.deleteReader(id).subscribe((response: any) => {
        this.openSnackBar("Xoá thành công");
        this.getReader()
      }, (error) => {
        this.openSnackBar(error);
      });

    });

  }


  // Phân trang
  public setReaderSource(readers: ReaderModel[]) {
    this.readerSource = new MatTableDataSource<ReaderModel>(readers);
    this.readerSource.paginator = this.paginator;
  }

  // Thêm độc giả
  public openCreateDialog() {
    this._matdialog.open(CreateReaderComponent).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getReader()

    });

  }

  // Cập nhật độc giả

  public openUpdateReaderDialog(reader: ReaderModel) {
    this._matdialog.open(UpdateReaderComponent,
      {
        data: {
          reader: reader
        }
      }
    ).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getReader()

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.readerSource.filter = filterValue.trim().toLowerCase();
  }

}

