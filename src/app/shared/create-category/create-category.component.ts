import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model';
import { ReaderModel } from 'src/app/models/reader-model';
import { BaseService } from 'src/app/services/base.service';
import { CategoryService } from 'src/app/services/category.service';
import { ReaderService } from 'src/app/services/reader.service';
import { CreateReaderComponent } from '../createReader/createReader.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent extends BaseService implements OnInit {
  public category: CategoryModel = new CategoryModel();

  constructor(
    public snackBar: MatSnackBar,
    public route: Router,
    private _categoryService: CategoryService,
    public dialogRef: MatDialogRef<CreateReaderComponent>
  ) { super(snackBar, route)}

  ngOnInit() {
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {

    this._categoryService.createCategory(this.category).subscribe((response : any) => {
      this.openSnackBar("Thêm thể loại thành công");
      this.dialogRef.close(true);
    },(error) => {
      this.openSnackBar(error);
    })
  }
}
