import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { DocumentComponent } from './document/document.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { FolderComponent } from './folder/folder.component';
import { FolderDetailComponent } from './folder-detail/folder-detail.component';
import { TagComponent } from './tag/tag.component';
import { TagDetailComponent } from './tag-detail/tag-detail.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'document', component: DocumentComponent },
  { path: 'document/:id', component: DocumentDetailComponent },
  { path: 'folder', component: FolderComponent },
  { path: 'folder/:id', component: FolderDetailComponent },
  { path: 'tag', component: TagComponent },
  { path: 'tag/:id', component: TagDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
