import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorModel } from 'src/app/models/author-model';
import { AuthorService } from 'src/app/services/author.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.scss']
})
export class UpdateAuthorComponent extends BaseService implements OnInit {
  public author: AuthorModel = new AuthorModel();

  public authorForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public route: Router,
    private _authorService: AuthorService,
    public dialogRef: MatDialogRef<UpdateAuthorComponent>
  ) { super(snackBar, route) }

  ngOnInit() {
    let author = JSON.parse(JSON.stringify(this.data.author));

    this.author = author;

    this.authorForm = new FormGroup(
      {
        name: new FormControl(this.data.author.name, [Validators.required]),
        website: new FormControl(this.data.author.website, [Validators.required]),
        status : new FormControl(this.data.author.status, [Validators.required]),
      }
    );
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {
    if (!this.authorForm.valid)
    return;

    let author = this.authorForm.value;
    author.id = this.author.id;
    author.status =  author.status ? 1 : 0;


    this._authorService.updateAuthor(author).subscribe((response: any) => {
      this.openSnackBar("Cập nhật tác giả thành công");
      this.dialogRef.close(true);
    }, (error) => {
      this.openSnackBar(error);
    })
  }
}
