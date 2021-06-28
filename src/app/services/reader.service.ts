import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReaderModel } from '../models/reader-model';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

constructor(private http : HttpClient) { }

public getReader = () => this.http.get(`${environment.domain}/api/Reader/get-reader`);

public createReader = (reader : ReaderModel) => this.http.post(`${environment.domain}/api/Reader/create-reader`, reader);

public updateReader = (reader : ReaderModel) => this.http.put(`${environment.domain}/api/Reader/update-reader`, reader);

public deleteReader = (id: string) => this.http.delete(`${environment.domain}/api/Reader/delete-reader/${id}`)
}
