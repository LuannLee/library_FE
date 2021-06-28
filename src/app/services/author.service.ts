import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthorModel } from '../models/author-model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

constructor(private http : HttpClient) { }

public getAuthor = () => this.http.get(`${environment.domain}/api/Author/get-author`);

public createAuthor = ( author: AuthorModel) => this.http.post(`${environment.domain}/api/Author/create-author`, author);

public updateAuthor = (author : AuthorModel) => this.http.put(`${environment.domain}/api/Author/update-author`, author);

public deleteAuthor = (id: string) => this.http.delete(`${environment.domain}/api/Author/delete-author/${id}`)

}
