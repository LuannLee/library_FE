import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReaderModel } from 'src/app/models/reader-model';
import { BaseService } from 'src/app/services/base.service';
import { ReaderService } from 'src/app/services/reader.service';

@Component({
  selector: 'app-update-reader',
  templateUrl: './update-reader.component.html',
  styleUrls: ['./update-reader.component.scss']
})
export class UpdateReaderComponent extends BaseService implements OnInit {
  public reader: ReaderModel = new ReaderModel();

  public readerForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public route: Router,
    private _readerService: ReaderService,
    public dialogRef: MatDialogRef<UpdateReaderComponent>
  ) { super(snackBar, route) }

  ngOnInit() {
    let reader = JSON.parse(JSON.stringify(this.data.reader));

    this.reader = reader;

    this.readerForm = new FormGroup(
      {
        name: new FormControl(this.data.reader.name, [Validators.required]),
        address: new FormControl(this.data.reader.address, [Validators.required]),
        status : new FormControl(this.data.reader.status, [Validators.required]),
      }
    );
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {

    if (!this.readerForm.valid)
    return;

    let reader = this.readerForm.value;
    reader.id = this.reader.id;
    reader.status =  reader.status ? 1 : 0;


    this._readerService.updateReader(reader).subscribe((response: any) => {
      this.openSnackBar("Cập nhật độc giả thành công");
      this.dialogRef.close(true);
    }, (error) => {
      this.openSnackBar(error);
    })
  }
}


