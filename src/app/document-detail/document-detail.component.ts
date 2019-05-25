import {ActivatedRoute} from '@angular/router';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';

import {CategoryData} from '../category-data';
import {DocumentData} from '../document-data';
import {DocumentService} from '../document.service';
import {HttpEventType} from '@angular/common/http';
import {$e} from 'codelyzer/angular/styles/chars';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: DocumentData;
  category: CategoryData;
  isCreating = false;
  formGroup = new FormGroup({});
  fileData: File;

  constructor(
    private documentService: DocumentService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

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

    this.formGroup.addControl('id', new FormControl(this.document.id));
    this.formGroup.addControl('name', new FormControl(this.document.name));
    this.formGroup.addControl('date', new FormControl(this.document.date));
    this.formGroup.addControl('file', new FormControl());
    this.formGroup.addControl('category', new FormControl());
  }

  selectCategory($event: CategoryData): void {
    this.formGroup.get('category').setValue($event.id);
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
