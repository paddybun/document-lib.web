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

  deleteDocument(id: string) {
    return this.http.delete(`https://localhost:5001/api/document/${id}`, { responseType: 'text' });
  }

  postDocument(documentForm: FormData) {
    return this.http.post('https://localhost:5001/api/document', documentForm, {
      reportProgress: true,
      observe: 'events'
    });
  }

  putDocument(documentForm: FormData) {
    return this.http.put('https://localhost:5001/api/document', documentForm, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
