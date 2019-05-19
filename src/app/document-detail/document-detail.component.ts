import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { CategoryData } from '../category-data';
import { DocumentData } from '../document-data';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: DocumentData;
  category: CategoryData;
  isCreating = false;

  constructor(private documentService: DocumentService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'create') {
      this.isCreating = true;
      this.document = new DocumentData();
      this.document.name = 'New document';
    } else {
      this.documentService.getDocument(id)
        .subscribe(doc => this.document = doc);
    }
  }

  selectCategory($event: CategoryData): void {
    this.category = $event;
  }
}
