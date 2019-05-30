import {ActivatedRoute} from '@angular/router';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';

import {CategoryData} from '../category-data';
import {DocumentData} from '../document-data';
import {DocumentService} from '../document.service';
import {HttpEventType} from '@angular/common/http';
import {$e} from 'codelyzer/angular/styles/chars';
import {CategoryService} from '../category.service';
import {SelectorDataItem} from '../selector-data-item';
import {FolderService} from '../folder.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  categories: SelectorDataItem[];
  folders: SelectorDataItem[];
  document: DocumentData;
  category: CategoryData;
  isCreating = false;
  formGroup = new FormGroup({});
  fileData: File;

  constructor(
    private documentService: DocumentService,
    private categoryService: CategoryService,
    private folderService: FolderService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(val => {
        this.categories = val.map(item => new SelectorDataItem(item.id, item.name));
      });

    this.folderService.getFolders()
      .subscribe(val => {
        this.folders = val.map(item => new SelectorDataItem(item.id, item.name));
      });

    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'create') {
      this.isCreating = true;
      this.document = new DocumentData();
      this.document.name = 'New document';
    } else {
      this.documentService.getDocument(id)
        .subscribe(doc => this.document = doc);
    }

    this.formGroup.addControl('id', new FormControl(this.document.id));
    this.formGroup.addControl('name', new FormControl(this.document.name));
    this.formGroup.addControl('date', new FormControl(this.document.date));
    this.formGroup.addControl('file', new FormControl());
    this.formGroup.addControl('category', new FormControl());
    this.formGroup.addControl('folder', new FormControl());
  }

  selectCategory(categoryId: string): void {
    this.formGroup.get('category').setValue(categoryId);
  }

  selectFolder(folderId: string): void {
    this.formGroup.get('folder').setValue(folderId);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.get('file').setValue(file);
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('id', this.formGroup.get('id').value);
    formData.append('name', this.formGroup.get('name').value);
    formData.append('date', this.formGroup.get('date').value);
    formData.append('file', this.formGroup.get('file').value);
    formData.append('category', this.formGroup.get('category').value);
    formData.append('folder', this.formGroup.get('folder').value);
    formData.append('tags', '');

    this.documentService.putDocuments(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('uploading');
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      });
  }
}
