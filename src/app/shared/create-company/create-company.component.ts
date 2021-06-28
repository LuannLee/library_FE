import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PublishCompanyModel } from 'src/app/models/publishCompany-model';
import { ReaderModel } from 'src/app/models/reader-model';
import { BaseService } from 'src/app/services/base.service';
import { PublishCompanyService } from 'src/app/services/publishCompany.service';
import { ReaderService } from 'src/app/services/reader.service';
import { CreateReaderComponent } from '../createReader/createReader.component';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent  extends BaseService implements OnInit {

  public company: PublishCompanyModel = new PublishCompanyModel();

  constructor(
    public snackBar: MatSnackBar,
    public route: Router,
    private _publishCompanyService: PublishCompanyService,
    public dialogRef: MatDialogRef<CreateReaderComponent>
  ) { super(snackBar, route)}

  ngOnInit() {
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {
    this._publishCompanyService.createPublishCompany(this.company).subscribe((response : any) => {
      this.openSnackBar("Thêm nhà xuất bản thành công");
      this.dialogRef.close(true);
    },(error) => {
      this.openSnackBar(error);
    })
  }
}
