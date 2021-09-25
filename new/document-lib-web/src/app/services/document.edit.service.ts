import { Injectable } from '@angular/core';
import {DocumentModel} from "../models/document.model";
import {DocumentService} from "./document.service";

@Injectable({
  providedIn: 'root'
})
export class DocumentEditService {

  public documentToEdit: DocumentModel | null = null
  public origin: 'new' | 'existing' | 'not_initialized' = "not_initialized";

  constructor(private documentService: DocumentService) {
  }

  public reset() {
    this.documentToEdit = null;
    this.origin = "not_initialized";
  }

}
