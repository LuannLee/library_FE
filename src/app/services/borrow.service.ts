import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BorowModel } from '../models/borow-model';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

constructor(private http : HttpClient) { }

public getBorrow = () => this.http.get(`${environment.domain}/api/Borrow/get-borrow`);

public getBorrowByStatus = () => this.http.get(`${environment.domain}/api/Borrow/get-borrow-bystatus`);

public getBorrowDetailByBorrow = (borrow: BorowModel) => this.http.post(`${environment.domain}/api/Borrow/get-borrowDetail-by-borrow`, borrow);

public getCountBorrow = () => this.http.get(`${environment.domain}/api/Borrow/get-count-borrow`);

public createBorrow = ( borrow: BorowModel) => this.http.post(`${environment.domain}/api/Borrow/create-borrow`, borrow);

public updateBorrow = (borrow : BorowModel) => this.http.put(`${environment.domain}/api/Borrow/update-borrow`, borrow);

public deleteBorrow = (id: string) => this.http.delete(`${environment.domain}/api/Borrow/delete-borrow/${id}`)

}
