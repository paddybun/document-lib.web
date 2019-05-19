import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DocumentData } from './document-data';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<DocumentData[]> {
    return this.http.get<DocumentData[]>('https://localhost:5001/api/document');
  }

  getDocument(id: string): Observable<DocumentData> {
    return this.http.get<DocumentData>(`https://localhost:5001/api/document/${id}`);
  }
}
