import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BookModel } from '../models/book-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

constructor(private http : HttpClient) { }

public getBook = () => this.http.get(`${environment.domain}/api/Book/get-book`);

public createBook = ( book: BookModel) => this.http.post(`${environment.domain}/api/Book/create-book`, book);

public updateBook = (book : BookModel) => this.http.put(`${environment.domain}/api/Book/update-book`, book);

public deleteBook = (id: string) => this.http.delete(`${environment.domain}/api/Book/delete-book/${id}`)

}
