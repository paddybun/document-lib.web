import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { TagData } from '../tag-data';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class TagDetailComponent implements OnInit {
  tag: TagData;
  isCreating = false;

  constructor(private tagService: TagService, private location: Location, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'create') {
      this.isCreating = true;
      this.tag = new TagData();
    } else {
      this.getTag(id);
    }
  }

  getTag(id): void {
      this.tagService.getTag(id)
        .subscribe(tag => this.tag = tag);
  }

  saveTag(): void {
    if (this.isCreating) {
      this.tagService.putTag(this.tag)
        .subscribe(tag => this.tag = tag);
    } else {
      this.tagService.postTag(this.tag)
        .subscribe(tag => this.tag = tag);
    }
  }

  deleteTag(): void {
    this.tagService.deleteTag(this.tag)
      .subscribe((res) => {
      if (res === 'deleted') {
        this.router.navigate(["/tag"]);
      }
    })
  }
}
