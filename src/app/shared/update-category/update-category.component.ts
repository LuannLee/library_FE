import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model';
import { BaseService } from 'src/app/services/base.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent extends BaseService implements OnInit {
  public category: CategoryModel = new CategoryModel();

  public categoryForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public route: Router,
    private _categoryService: CategoryService,
    public dialogRef: MatDialogRef<UpdateCategoryComponent>
  ) { super(snackBar, route) }

  ngOnInit() {
    let category = JSON.parse(JSON.stringify(this.data.category));

    this.category = category;

    this.categoryForm = new FormGroup(
      {
        name: new FormControl(this.data.category.name, [Validators.required]),
        status : new FormControl(this.data.category.status, [Validators.required]),
      }
    );
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {

    if (!this.categoryForm.valid)
    return;

    let category = this.categoryForm.value;
    category.id = this.category.id;
    category.status =  category.status ? 1 : 0;

    this._categoryService.updateCategory(category).subscribe((response: any) => {
      this.openSnackBar("Cập nhật thể loại thành công");
      this.dialogRef.close(true);
    }, (error) => {
      this.openSnackBar(error);
    })
  }
}
