import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { TagDetailComponent } from './tag-detail/tag-detail.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'tag', component: TagComponent },
  { path: 'tag/:id', component: TagDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
