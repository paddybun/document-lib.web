import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';

import {CategoryData} from '../category-data';
import {DocumentData} from '../document-data';
import {DocumentService} from '../document.service';
import {HttpEventType} from '@angular/common/http';
import {CategoryService} from '../category.service';
import {SelectorDataItem} from '../selector-data-item';
import {FolderService} from '../folder.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  isCreating = false;
  categories: SelectorDataItem[];
  folders: SelectorDataItem[];
  document: DocumentData;
  category: CategoryData;
  formGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    date: new FormControl(),
    file: new FormControl(),
    category: new FormControl(),
    folder: new FormControl()
  });
  fileData: File;

  constructor(
    private documentService: DocumentService,
    private categoryService: CategoryService,
    private folderService: FolderService,
    private location: Location,
    private route: ActivatedRoute
  ) {
  }

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
        .subscribe(doc => {
          this.document = doc;
          this.formGroup.get('id').setValue(this.document.id);
          this.formGroup.get('name').setValue(this.document.name);
          this.formGroup.get('date').setValue(this.document.date);
          this.folders.forEach(item => {
            if (item.id.toLowerCase() === doc.folder.toLowerCase()) {
              item.preselected = true;
              this.formGroup.get('folder').setValue(item.id);
            }
          });
          this.categories.forEach(item => {
            if (item.id.toLowerCase() === doc.category.toLowerCase()) {
              item.preselected = true;
              this.formGroup.get('category').setValue(item.id);
            }
          });
        });
    }
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

    if (this.isCreating) {
      this.documentService.postDocument(formData)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log('uploading');
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        });
    } else {
      this.documentService.putDocument(formData)
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
}
