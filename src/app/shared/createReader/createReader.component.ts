import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReaderModel } from 'src/app/models/reader-model';
import { BaseService } from 'src/app/services/base.service';
import { ReaderService } from 'src/app/services/reader.service';

@Component({
  selector: 'app-createReader',
  templateUrl: './createReader.component.html',
  styleUrls: ['./createReader.component.scss']
})
export class CreateReaderComponent extends BaseService implements OnInit {
  public reader: ReaderModel = new ReaderModel();

  constructor(
    public snackBar: MatSnackBar,
    public route: Router,
    private _readerService: ReaderService,
    public dialogRef: MatDialogRef<CreateReaderComponent>
  ) { super(snackBar, route)}

  ngOnInit() {
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {
    this._readerService.createReader(this.reader).subscribe((response : any) => {
      this.openSnackBar("Thêm độc giả thành công");
      this.dialogRef.close(true);
    },(error) => {
      this.openSnackBar(error);
    })
  }
}
