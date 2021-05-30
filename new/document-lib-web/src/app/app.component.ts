import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DocumentService} from "./services/document.service";
import {MetadataService} from "./services/metadata.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'document-lib-web';

  constructor(private router: Router, private metadataService: MetadataService) {
  }

  ngOnInit(): void {
    this.metadataService.loadMetadata();
  }

  public navigate(urlPart: string): void {
    this.router.navigateByUrl(urlPart);
  }
}


