import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PublishCompanyModel } from 'src/app/models/publishCompany-model';
import { ReaderModel } from 'src/app/models/reader-model';
import { BaseService } from 'src/app/services/base.service';
import { PublishCompanyService } from 'src/app/services/publishCompany.service';
import { ReaderService } from 'src/app/services/reader.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { CreateCompanyComponent } from 'src/app/shared/create-company/create-company.component';
import { CreateReaderComponent } from 'src/app/shared/createReader/createReader.component';
import { UpdateCompanyComponent } from 'src/app/shared/update-company/update-company.component';
import { UpdateReaderComponent } from 'src/app/shared/update-reader/update-reader.component';

@Component({
  selector: 'app-publish-company',
  templateUrl: './publish-company.component.html',
  styleUrls: ['./publish-company.component.scss']
})
export class PublishCompanyComponent extends BaseService implements OnInit {

  public companies: PublishCompanyModel[] = [];

  public company!: PublishCompanyModel;

  displayedColumns: string[] = ['position', 'name', 'address', 'email', 'createdDate', 'updatedDate', 'status', 'controls'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  companySource: MatTableDataSource<PublishCompanyModel> = new MatTableDataSource<PublishCompanyModel>([]);


  constructor(private _publishCompanyService: PublishCompanyService,
    public snackBar: MatSnackBar,
    public route: Router,
    private _matdialog: MatDialog,
  ) {
    super(snackBar, route)

    this.getPublishCompany()
  }

  ngOnInit() {
  }

  // Lấy danh sách độc giả
  public getPublishCompany() {
    this._publishCompanyService.getPublishCompany().subscribe((companies: any) => {
      this.companies = companies.data;
      this.setPublishCompanySource(this.companies);
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
      this._publishCompanyService.deletePublishCompany(id).subscribe((response: any) => {
        this.openSnackBar("Xoá thành công");
        this.getPublishCompany()
      }, (error) => {
        this.openSnackBar(error);
      });

    });

  }


  // Phân trang
  public setPublishCompanySource(companies: PublishCompanyModel[]) {
    this.companySource = new MatTableDataSource<PublishCompanyModel>(companies);
    this.companySource.paginator = this.paginator;
  }

  // Thêm độc giả
  public openCreateDialog() {
    this._matdialog.open(CreateCompanyComponent).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getPublishCompany()

    });

  }

  // Cập nhật độc giả

  public openUpdateReaderDialog(company: PublishCompanyModel) {
    this._matdialog.open(UpdateCompanyComponent,
      {
        data: {
          company: company
        }
      }
    ).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;

      // Đã đồng ý
      this.getPublishCompany()

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companySource.filter = filterValue.trim().toLowerCase();
  }

}

