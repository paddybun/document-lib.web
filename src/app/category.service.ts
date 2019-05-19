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
    return this.http.get<CategoryData[]>('https://localhost:5001/api/category');
  }

  getCategory(id: string): Observable<CategoryData> {
    return this.http.get<CategoryData>(`https://localhost:5001/api/category/${id}`);
  }

  putCategory(category: CategoryData): Observable<CategoryData> {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return this.http.put<CategoryData>('https://localhost:5001/api/category', category, options);
  }

  postCategory(category: CategoryData): Observable<CategoryData> {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return this.http.post<CategoryData>('https://localhost:5001/api/category', category, options);
  }
}
