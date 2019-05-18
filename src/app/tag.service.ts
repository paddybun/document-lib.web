import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TagData } from './tag-data';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<TagData[]> {
    return this.http.get<TagData[]>('https://localhost:5001/api/tag');
  }
}
