import { Component, OnInit } from '@angular/core';
import {MetadataService} from "../../services/metadata.service";
import {TagModel} from "../../models/tag.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {

  }

}
