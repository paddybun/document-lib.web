import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CategoryData } from './category-data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryData[]> {
    return this.http.get<CategoryData[]>('https://localhost:5001/api/Category');
  }
}
