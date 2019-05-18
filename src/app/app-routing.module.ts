import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'tag', component: TagComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
