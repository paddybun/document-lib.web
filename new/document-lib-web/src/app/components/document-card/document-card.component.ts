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

  public isPdfLoading: boolean = false

  public isVisible = true
  public isDeleting = false
  public deleteProcessStarted = false

  constructor( private documentService: DocumentService, private router: Router, private documentEditService: DocumentEditService) { }

  ngOnInit(): void {
  }

  public formatDate(date: string): string {
    return format(new Date(date), "dd.MM.yyyy")
  }

  public editDocument(doc: DocumentModel) {
    this.documentEditService.documentToEdit = doc
    this.documentEditService.origin = doc.unsorted ? 'new' : 'existing'
    this.router.navigateByUrl("edit")
  }

  public downloadAndOpenDocument(name: string) {
    this.isPdfLoading = true
    this.documentService.downloadDocument(name).subscribe( blob => {
      this.isPdfLoading = false
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")
    })
  }

  public changeToDeleteMode(state:boolean) {
    this.isDeleting = state
  }

  public deleteDocument(id: string) {
    this.deleteProcessStarted = true
    this.documentService.deleteDocument(id).subscribe(x => {
      this.isVisible = false
    });
  }
}
