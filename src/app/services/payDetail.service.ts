import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PayDetailModel } from '../models/payDetail-model';

@Injectable({
  providedIn: 'root'
})
export class PayDetailService {

constructor(private http : HttpClient) { }

public getPayDetail = () => this.http.get(`${environment.domain}/api/PayDetail/get-payDetail`);

public createPayDetail = ( payDetail: PayDetailModel) => this.http.post(`${environment.domain}/api/PayDetail/create-payDetail`, payDetail);

public updatePayDetail = (payDetail : PayDetailModel) => this.http.put(`${environment.domain}/api/PayDetail/update-payDetail`, payDetail);

public deletePayDetail = (id: string) => this.http.delete(`${environment.domain}/api/PayDetail/delete-payDetail/${id}`)

}
