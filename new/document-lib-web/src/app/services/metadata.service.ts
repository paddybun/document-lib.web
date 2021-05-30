import { Injectable } from '@angular/core';
import {DocumentService} from "./document.service";
import {MetadataModel} from "../models/metadata.model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  public $metadata: BehaviorSubject<MetadataModel> = new BehaviorSubject({ tags: [], categories: [], folders: [] } as MetadataModel);

  constructor(private documentService: DocumentService) { }

  public loadMetadata() {
    this.documentService.getMetadata().subscribe(data => this.$metadata.next(data));
  }
}
