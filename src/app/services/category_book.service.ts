import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category_bookModel } from '../models/category_book-model';

@Injectable({
  providedIn: 'root'
})
export class Category_bookService {

constructor(private http : HttpClient) { }

public getCategory_book = () => this.http.get(`${environment.domain}/api/Category_Book/get-category_book`);

public createCategory_book = ( cbook: Category_bookModel) => this.http.post(`${environment.domain}/api/Category_Book/create-category_book`, cbook);

public deleteCategory_book = (categoryId: string, bookId: string) => this.http.delete(`${environment.domain}/api/Category_Book/delete-author_book/${categoryId}/${bookId}`);

}
