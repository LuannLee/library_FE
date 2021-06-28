import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private http : HttpClient) { }

public getCategory = () => this.http.get(`${environment.domain}/api/Category/get-category`);

public createCategory = ( category: CategoryModel) => this.http.post(`${environment.domain}/api/Category/create-category`, category);

public updateCategory = (category : CategoryModel) => this.http.put(`${environment.domain}/api/Category/update-category`, category);

public deleteCategory = (id: string) => this.http.delete(`${environment.domain}/api/Category/delete-category/${id}`)

}
