import { Component, OnInit } from '@angular/core';

import { CategoryData } from '../category-data';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: CategoryData[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

}
