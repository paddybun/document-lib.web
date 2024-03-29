import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MetadataService} from "../../services/metadata.service";
import {DocumentModel} from "../../models/document.model";
import {DocumentEditService} from "../../services/document.edit.service";
import {Subscription} from "rxjs";
import {format} from "date-fns";
import {DocumentService} from "../../services/document.service";
import {Router} from "@angular/router";
import {de} from "date-fns/locale"
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  public tagsDatasource: string[] = [];
  public tags: string[] = [];
  public categories: string[] = [];
  public currentDocument!: DocumentModel;
  public format = format;

  public dateOfDocument: string = "";

  @ViewChild("docdesc", {static: true}) description!: HTMLTextAreaElement;

  private metadataSubscription!: Subscription;
  public isSaving!: boolean;
  public pdfUrl!: SafeResourceUrl;

  constructor(private metadataService: MetadataService,
              private documentEditService: DocumentEditService,
              private documentService: DocumentService,
              private router: Router,
              private sanitizer: DomSanitizer) {
  }

  ngOnDestroy(): void {
    this.metadataSubscription.unsubscribe();
    this.documentEditService.reset();
  }

  ngOnInit(): void {
    if (this.documentEditService.documentToEdit == null) {
      return;
    }
    this.currentDocument = this.documentEditService.documentToEdit;
    this.dateOfDocument = format(new Date(this.currentDocument.dateOfDocument), "yyyy-MM-dd");
    this.metadataSubscription = this.metadataService.$metadata.subscribe(data => {
      this.tagsDatasource = data.tags.map(x => x.name);
      this.categories = data.categories.map(x => x.name);
    });
    this.documentService.downloadDocument(this.currentDocument.blobLocation).subscribe(blob => {
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
    });
  }

  public formatDate(date: string) {
    const dt = format(new Date(date), "yyyy-MM-dd");
    return dt;
  }

  public save() {
    this.isSaving = true;
    this.currentDocument.dateOfDocument = this.dateOfDocument;
    this.currentDocument.description = this.description.value;
    this.documentService.saveDocument(this.currentDocument).subscribe(
      response => {
        console.log(response);
        this.metadataService.loadMetadata();
        this.isSaving = false;
        if (this.documentEditService.origin === "new") {
          this.router.navigateByUrl("new");
        } else if (this.documentEditService.origin === "existing") {
          this.router.navigateByUrl("browse");
        }
      },
      error => {
        console.log(error);
        this.isSaving = false;
      }
    );
    console.log(this.currentDocument);
  }

  public handleCategoryBlur(category: string) {
    this.currentDocument.category = category;
    this.addTag(category);
  }

  public handleCompanyBlur(event: any) {
    const company = event.target.value;
    this.addTag(company);
  }

  public handleDateBlur(event: any) {
    const date = new Date(event.target.value);
    const month = format(date, "MMMM", {locale: de}).toLowerCase();
    const year = format(date, "yyyy");
    this.addTag(month);
    this.addTag(year);
  }

  private addTag(tagname: string) {
    tagname = tagname.toLowerCase();
    if (this.currentDocument.tags.indexOf(tagname) >= 0 || tagname === "") {
      return;
    }
    this.currentDocument.tags.push(tagname);
  }
}
