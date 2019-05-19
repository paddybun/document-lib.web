import { Component, OnInit } from '@angular/core';
import { DocumentData } from '../document-data';
import {DocumentService} from '../document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: DocumentData[];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.getDocuments()
      .subscribe(docs => this.documents = docs);
  }
}
