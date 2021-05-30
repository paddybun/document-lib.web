import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DocumentService} from "../../services/document.service";

@Component({
  selector: 'app-dnd-upload',
  templateUrl: './dnd-upload.component.html',
  styleUrls: ['./dnd-upload.component.scss']
})
export class DndUploadComponent {
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef | undefined;
  fileAttr = 'Choose File';

  constructor(private documentService: DocumentService) {
  }

  public fileMap: { key: string, value: File}[] = [];

  uploadFileEvt(uploadEvent: any) {
    if (uploadEvent.target.files && uploadEvent.target.files[0]) {

      for (const file of uploadEvent.target.files as File[]) {
        this.fileMap.push({ key: file.name, value: file });
      }

      if (this.fileInput) {
        this.fileInput.nativeElement.value = "";
      }
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  public uploadSingle(file: File) {
    this.documentService.uploadFile(file);
    this.fileMap = [];
  }

  public uploadAll() {
    for(const f of this.fileMap) {
      this.documentService.uploadFile(f.value);
    }
    this.fileMap = [];
  }
}
