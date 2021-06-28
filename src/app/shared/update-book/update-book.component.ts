import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorModel } from 'src/app/models/author-model';
import { BookModel } from 'src/app/models/book-model';
import { CategoryModel } from 'src/app/models/category-model';
import { PublishCompanyModel } from 'src/app/models/publishCompany-model';
import { AuthorService } from 'src/app/services/author.service';
import { BaseService } from 'src/app/services/base.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { PublishCompanyService } from 'src/app/services/publishCompany.service';


@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})

export class UpdateBookComponent extends BaseService implements OnInit {
  public book: BookModel = new BookModel();

  public companies: PublishCompanyModel[] = [];
  public authors : AuthorModel[] = [];
  public categories: CategoryModel[] = [];

  public bookForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public route: Router,
    private _bookService: BookService,
    private _publishCompanyService : PublishCompanyService ,
    private _authorService : AuthorService,
    private _categoryService: CategoryService,
    public dialogRef: MatDialogRef<UpdateBookComponent>
  ) { super(snackBar, route) }

  ngOnInit() {
    this.getPublishCompany();
    this.getAuthor();
    this.getCategory();


    let book = JSON.parse(JSON.stringify(this.data.book));

    this.book = book;

    this.bookForm = new FormGroup(
      {
        name: new FormControl(this.data.book.name, [Validators.required]),
        publishYear: new FormControl(this.data.book.publishYear, [Validators.required]),
        quantity: new FormControl(this.data.book.quantity, [Validators.required]),
        publishCompanyId: new FormControl(this.data.book.publishCompanyId, [Validators.required]),
        authorId : new FormControl(this.data.book.authorId, [Validators.required]),
        categoryId: new FormControl(this.data.book.categoryId, [Validators.required]),
        status : new FormControl(this.data.book.status, [Validators.required]),
      }
    );
  }

  public getPublishCompany() {
    this._publishCompanyService.getPublishCompany().subscribe((companies: any) => {
      this.companies = companies.data;
    }, (error) => {
      this.openSnackBar(error);
    })
  }

  public getAuthor() {
    this._authorService.getAuthor().subscribe((authors: any) => {
      this.authors = authors.data;
    }, (error) => {
      this.openSnackBar(error);
    })
  }

  public getCategory() {
    this._categoryService.getCategory().subscribe((category: any) => {
      this.categories = category.data;
    }, (error) => {
      this.openSnackBar(error);
    })
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {
    if (!this.bookForm.valid)
    return;

    let book = this.bookForm.value;
    book.id = this.book.id;
    book.status =  book.status ? 1 : 0;

    this._bookService.updateBook(book).subscribe((response: any) => {
      this.openSnackBar("Cập nhật tác giả thành công");
      this.dialogRef.close(true);
    }, (error) => {
      this.openSnackBar(error);
    })
  }
}
