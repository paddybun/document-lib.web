import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { format } from 'date-fns';
import {DocumentModel} from "../../models/document.model";
import {DocumentService} from "../../services/document.service";
import {Router} from "@angular/router";
import {DocumentEditService} from "../../services/document.edit.service";

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent implements OnInit {

  @Input()
  public document!: DocumentModel

  constructor( private documentService: DocumentService, private router: Router, private documentEditService: DocumentEditService) { }

  ngOnInit(): void {
  }

  public formatDate(date: string): string {
    return format(new Date(date), "dd.MM.yyyy");
  }

  public editDocument(doc: DocumentModel) {
    this.documentEditService.documentToEdit = doc;
    this.router.navigateByUrl("edit");
  }

  public downloadAndOpenDocument(name: string) {
    this.documentService.downloadDocument(name).subscribe( blob => {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    })
  }
}
