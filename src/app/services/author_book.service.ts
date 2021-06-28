import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author_bookModel } from '../models/author_book-model';

@Injectable({
  providedIn: 'root'
})
export class Author_bookService {

constructor(private http : HttpClient) { }

public getAuthor_book = () => this.http.get(`${environment.domain}/api/Author_Book/get-author_book`);

public createAuthor_book = ( book: Author_bookModel) => this.http.post(`${environment.domain}/api/Author_Book/create-author_book`, book);

public deleteAuthor_book = (authorId: string, bookId: string) => this.http.delete(`${environment.domain}/api/Author_Book/delete-author_book/${authorId}/${bookId}`);

}
