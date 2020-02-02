import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import {CategoryService} from '../category.service';
import {CategoryData} from '../category-data';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category: CategoryData = new CategoryData();
  isCreating = false;

  constructor(private categoryService: CategoryService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'create') {
      this.isCreating = true;
    } else {
      this.getCategory(id);
    }
  }

  getCategory(id): void {
    this.categoryService.getCategory(id)
      .subscribe(category => this.category = category);
  }

  saveCategory(): void {
    if (this.isCreating) {
      this.categoryService.putCategory(this.category)
        .subscribe(cat => this.category = cat);
    } else {
      this.categoryService.postCategory(this.category)
        .subscribe(cat => this.category = cat);
    }
  }
}
