import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FolderData } from './folder-data';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http: HttpClient) { }

  getFolders(): Observable<FolderData[]> {
    return this.http.get<FolderData[]>('https://localhost:5001/api/folder');
  }
}
