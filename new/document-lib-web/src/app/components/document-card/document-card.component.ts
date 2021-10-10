import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { format } from 'date-fns';
import {DocumentModel} from "../../models/document.model";
import {DocumentService} from "../../services/document.service";
import {Router} from "@angular/router";
import {DocumentEditService} from "../../services/document.edit.service";
import {Subscription} from "rxjs";
import {MetadataService} from "../../services/metadata.service";
import {MetadataModel} from "../../models/metadata.model";

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent implements OnInit, OnDestroy {

  @Input()
  public document!: DocumentModel

  public isPdfLoading: boolean = false

  public isVisible = true
  public isDeleting = false
  public deleteProcessStarted = false

  public metadata: MetadataModel = { tags: [], folders: [], categories: [] };
  // @ts-ignore
  public metadataSubscription: Subscription;

  constructor( private documentService: DocumentService, private router: Router, private documentEditService: DocumentEditService, private metadataService: MetadataService) { }

  ngOnInit(): void {
     this.metadataSubscription = this.metadataService.$metadata.subscribe(data => {
       this.metadata = data
     })
  }

  ngOnDestroy(): void {
    this.metadataSubscription.unsubscribe();
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

  public getFolderName(folderName: string) {
    if (!this.metadata) return ""

    return this.metadata.folders.find(x => x.name === folderName)?.displayName || ""
  }
}
