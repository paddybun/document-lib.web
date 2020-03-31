import { Component, OnInit } from '@angular/core';
import { FolderData } from '../folder-data';
import { FolderService } from '../folder.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-folder-detail',
  templateUrl: './folder-detail.component.html',
  styleUrls: ['./folder-detail.component.css']
})
export class FolderDetailComponent implements OnInit {
  folder: FolderData;
  isCreating = false;

  constructor(private folderService: FolderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const folderId = this.route.snapshot.paramMap.get('id');

    if (folderId === 'create') {
      this.isCreating = true;
      this.folder = new FolderData();
      this.folder.name = 'New Folder';
    } else {
      this.folderService.getFolder(folderId)
        .subscribe( val => this.folder = val);
    }
  }

  save(): void {
    if (this.isCreating) {
      this.folderService.postFolder(this.folder)
        .subscribe(val => this.folder = val);
    } else {
      this.folderService.putFolder(this.folder)
        .subscribe(val => this.folder = val);
    }
  }

  deleteFolder() {
    this.folderService.deleteFolder(this.folder.id)
      .subscribe(res => {
        if (res === 'deleted') {
          this.router.navigate(['/folder'])
        }
      })
  }
}
