import { Component, OnInit } from '@angular/core';
import {FolderData} from '../folder-data';
import {FolderService} from '../folder.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  folders: FolderData[];
  constructor(private folderService: FolderService) { }

  ngOnInit() {
    this.folderService.getFolders()
      .subscribe(val => {
        this.folders = val;
      });
  }

}
