import { Component, OnInit } from '@angular/core';
import {MetadataService} from "../../services/metadata.service";
import {FormControl} from "@angular/forms";
import {DocumentService} from "../../services/document.service";
import {DocumentModel} from "../../models/document.model";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  public tags: string[] = []
  public selectedTags: string[] = []

  public documents: DocumentModel[] = []

  public myControl = new FormControl();

  constructor(private metadataService: MetadataService, private documentService: DocumentService) { }

  ngOnInit(): void {
    this.metadataService.$metadata.subscribe(metadata => {
      this.tags = metadata.tags.map(x => x.name)
    })
  }

  public browse() {
    this.documentService.searchDocument(this.selectedTags).subscribe(docs => {
      this.documents = docs
    })
  }

}
