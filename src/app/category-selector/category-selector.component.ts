import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { CategoryData } from '../category-data';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  @Output() selectionChanged = new EventEmitter<CategoryData>();

  categories: CategoryData[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(cat => this.categories = cat);
  }

  onChange(event: any): void {
    const selectedCategory = this.categories.filter((item: CategoryData) => {
      return item.id === event.target.value;
    })[0];

    this.selectionChanged.emit(selectedCategory);
  }
}
