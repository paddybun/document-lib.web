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

  getTag(id: string): Observable<TagData> {
    return this.http.get<TagData>(`https://localhost:5001/api/tag/${id}`);
  }

  putTag(tag: TagData): Observable<TagData> {
    console.log('posting tag: ' + JSON.stringify(tag))
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return this.http.put<TagData>('https://localhost:5001/api/tag', tag, options);
  }
}
