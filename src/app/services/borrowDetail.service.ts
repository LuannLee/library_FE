import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BorrowDetail } from '../models/borrowDetail';

@Injectable({
  providedIn: 'root'
})
export class BorrowDetailService {

constructor(private http : HttpClient) { }

public getBorrowDetail = () => this.http.get(`${environment.domain}/api/BorrowDetail/get-borrowDetail`);

public createBorrowDetail = ( borrowDetail: BorrowDetail) => this.http.post(`${environment.domain}/api/BorrowDetail/create-borrowDetail`, borrowDetail);

public updateBorrowDetail = (borrowDetail : BorrowDetail) => this.http.put(`${environment.domain}/api/BorrowDetail/update-borrowDetail`, borrowDetail);

public deleteBorrowDetail = (id: string) => this.http.delete(`${environment.domain}/api/BorrowDetail/delete-borrowDetail/${id}`)

}
