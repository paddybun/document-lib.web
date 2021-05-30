import { Component, OnInit } from '@angular/core';
import { TagData } from '../tag-data';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tags: TagData[];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getTags()
      .subscribe((tags) => {
        this.tags = tags;
      });
  }
}
