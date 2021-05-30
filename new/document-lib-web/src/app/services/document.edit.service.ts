import { Injectable } from '@angular/core';
import {DocumentModel} from "../models/document.model";
import {DocumentService} from "./document.service";

@Injectable({
  providedIn: 'root'
})
export class DocumentEditService {

  public documentToEdit!: DocumentModel

  constructor(private documentService: DocumentService) { }


}
