import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorModel } from 'src/app/models/author-model';
import { ReaderModel } from 'src/app/models/reader-model';
import { AuthorService } from 'src/app/services/author.service';
import { BaseService } from 'src/app/services/base.service';
import { ReaderService } from 'src/app/services/reader.service';
import { CreateReaderComponent } from '../createReader/createReader.component';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent extends BaseService implements OnInit {
  public author: AuthorModel = new AuthorModel();

  constructor(
    public snackBar: MatSnackBar,
    public route: Router,
    private _authorService: AuthorService,
    public dialogRef: MatDialogRef<CreateAuthorComponent>
  ) { super(snackBar, route)}

  ngOnInit() {
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {
    this._authorService.createAuthor(this.author).subscribe((response : any) => {
      this.openSnackBar("thêm thành công");
      this.dialogRef.close(true);
    },(error) => {
      this.openSnackBar(error);
    })
  }
}
