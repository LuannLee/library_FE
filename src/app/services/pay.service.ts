import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PayModel } from '../models/pay-model';


@Injectable({
  providedIn: 'root'
})
export class PayService {

constructor(private http : HttpClient) { }

public getPay = () => this.http.get(`${environment.domain}/api/Pay/get-pay`);

public createPay = ( pay : PayModel) => this.http.post(`${environment.domain}/api/Pay/create-pay`, pay);

public updatePay = (pay : PayModel) => this.http.put(`${environment.domain}/api/Pay/update-pay`, pay);

public deletePay = (id: string) => this.http.delete(`${environment.domain}/api/Pay/delete-pay/${id}`)

}
