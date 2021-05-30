import { Component, OnInit } from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {DocumentModel} from "../../models/document.model";

@Component({
  selector: 'app-new-docs',
  templateUrl: './new-docs.component.html',
  styleUrls: ['./new-docs.component.scss']
})
export class NewDocsComponent implements OnInit {

  public documents!: DocumentModel[];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.getNewDocuments().subscribe((docs: DocumentModel[]): void => {
      this.documents = docs;
    })
  }

}
