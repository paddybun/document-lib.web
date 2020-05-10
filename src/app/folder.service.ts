import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FolderData } from './folder-data';
import {RegisterData} from './register-data';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http: HttpClient) { }

  getFolders(): Observable<FolderData[]> {
    return this.http.get<FolderData[]>('https://localhost:5001/api/folder');
  }

  getFolder(id): Observable<FolderData> {
    return this.http.get<FolderData>(`https://localhost:5001/api/folder/${id}`);
  }

  getRegisters(id): Observable<RegisterData[]> {
    return this.http.get<RegisterData[]>(`https://localhost:5001/api/folder/registers/${id}`);
  }

  putFolder(folder: FolderData): Observable<FolderData> {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return this.http.put<FolderData>('https://localhost:5001/api/folder', folder, options);
  }

  putRegister(register: RegisterData): Observable<RegisterData> {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const id = register.id;
    const displayName = register.displayName;

    return this.http.put<RegisterData>('https://localhost:5001/api/folder/register', {id, displayName}, options);
  }

  makeRegisterActive (register: RegisterData): Observable<RegisterData> {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const id = register.id;
    const isActive = true;

    return this.http.put<RegisterData>('https://localhost:5001/api/folder/register', {id, isActive}, options);
  }

  postFolder(folder: FolderData): Observable<FolderData> {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return this.http.post<FolderData>('https://localhost:5001/api/folder', folder, options);
  }

  deleteFolder(id) {
    return this.http.delete(`https://localhost:5001/api/folder/${id}`, { responseType: 'text' });
  }
}
