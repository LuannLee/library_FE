import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PublishCompanyModel } from '../models/publishCompany-model';

@Injectable({
  providedIn: 'root'
})
export class PublishCompanyService {

constructor(private http : HttpClient) { }

public getPublishCompany = () => this.http.get(`${environment.domain}/api/PublishCompany/get-company`);

public createPublishCompany = ( company: PublishCompanyModel) => this.http.post(`${environment.domain}/api/PublishCompany/create-company`, company);

public updatePublishCompany = (company : PublishCompanyModel) => this.http.put(`${environment.domain}/api/PublishCompany/update-company`, company);

public deletePublishCompany = (id: string) => this.http.delete(`${environment.domain}/api/PublishCompany/delete-company/${id}`)

}
