import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent extends BaseService implements OnInit {
  public book: BookModel = new BookModel();

  public companies: PublishCompanyModel[] = [];
  public authors : AuthorModel[] = [];
  public categories: CategoryModel[] = [];

  public selectedCompany: any;


  public bookForm: FormGroup = new FormGroup({});

  constructor(
    public snackBar: MatSnackBar,
    public route: Router,
    private _bookService: BookService,
    private _publishCompanyService: PublishCompanyService,
    private _authorService: AuthorService,
    private _categoryService: CategoryService,
    public dialogRef: MatDialogRef<CreateBookComponent>
  ) { super(snackBar, route) }

  ngOnInit() {
    this.getPublishCompany();
    this.getAuthor();
    this.getCategory();

    this.bookForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        publishYear: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
        publishCompanyId: new FormControl('', [Validators.required]),
        AuthorId : new FormControl('', [Validators.required]),
        CategoryId: new FormControl('', [Validators.required]),
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

    // this.book.publishCompanyId = this.selectedCompany;
    let book = this.bookForm.value;

    console.log(book);

    this._bookService.createBook(book).subscribe((response: any) => {
      this.openSnackBar("Thêm sách thành công");
      this.dialogRef.close(true);
    }, (error) => {
      this.openSnackBar(error);
    })
  }
}
