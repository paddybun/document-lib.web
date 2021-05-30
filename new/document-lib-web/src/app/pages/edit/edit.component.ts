import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MetadataService} from "../../services/metadata.service";
import {DocumentModel} from "../../models/document.model";
import {DocumentEditService} from "../../services/document.edit.service";
import {Subscription} from "rxjs";
import {format} from "date-fns";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  public tags: string[] = [];
  public categories: string[] = [];
  public currentDocument!: DocumentModel;
  public panelOpenState: boolean = false;
  public format = format;

  @ViewChild("docdesc",{static: true}) description!: HTMLTextAreaElement;

  private metadataSubscription!: Subscription;

  constructor(private metadataService: MetadataService, private documentEditService: DocumentEditService) {
  }

  ngOnDestroy(): void {
    this.metadataSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.metadataSubscription = this.metadataService.$metadata.subscribe(data => {
      this.tags = data.tags.map(x => x.name)
      this.categories = data.categories.map(x => x.name)
    });
    this.currentDocument = this.documentEditService.documentToEdit;
  }

  public formatDate(date: string) {
    return format(new Date(date), "yyyy-MM-dd");
  }

  public save() {
    console.log(this.currentDocument);
  }

  public categoryChanged(category: string) {
    this.currentDocument.category = category;
  }
}
