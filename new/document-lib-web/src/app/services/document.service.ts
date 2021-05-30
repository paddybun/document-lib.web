import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DocumentModel} from "../models/document.model";
import {MetadataModel} from "../models/metadata.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) { }

  public uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    this.httpClient.post("http://localhost:7071/api/UploadDocumentsFunction", formData).subscribe();
  }

  public getNewDocuments(): Observable<DocumentModel[]> {
    return this.httpClient.post<DocumentModel[]>("http://localhost:7071/api/QueryDocuments", { unsorted: true },{ headers: { "Content-Type": "application/json" } });
  }

  public getMetadata(): Observable<MetadataModel> {
    return this.httpClient.get<MetadataModel>("http://localhost:7071/api/GetMetadata");
  }

  public downloadDocument(physicalName: string): Observable<Blob> {
    return this.httpClient.request("post", "http://localhost:7071/api/DownloadDocument", { body: { physicalName }, responseType: "blob"});
  }
}
