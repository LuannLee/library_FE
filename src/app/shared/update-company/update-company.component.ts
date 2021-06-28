import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PublishCompanyModel } from 'src/app/models/publishCompany-model';
import { BaseService } from 'src/app/services/base.service';
import { PublishCompanyService } from 'src/app/services/publishCompany.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent extends BaseService implements OnInit {
  public company: PublishCompanyModel = new PublishCompanyModel();

  public companyForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public route: Router,
    private _publishCompanyService: PublishCompanyService,
    public dialogRef: MatDialogRef<UpdateCompanyComponent>
  ) { super(snackBar, route) }

  ngOnInit() {
    let company = JSON.parse(JSON.stringify(this.data.company));

    this.company = company;

    this.companyForm = new FormGroup(
      {
        name: new FormControl(this.data.company.name, [Validators.required]),
        address: new FormControl(this.data.company.address, [Validators.required]),
        email : new FormControl(this.data.company.email, [Validators.required]),
        status : new FormControl(this.data.company.status, [Validators.required]),
      }
    );
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {

    if (!this.companyForm.valid)
    return;

    let company = this.companyForm.value;
    company.id = this.company.id;
    company.status =  company.status ? 1 : 0;

    this._publishCompanyService.updatePublishCompany(company).subscribe((response: any) => {
      this.openSnackBar("Cập nhật nhà xuất bản thành công");
      this.dialogRef.close(true);
    }, (error) => {
      this.openSnackBar(error);
    })
  }
}


