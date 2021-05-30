import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { TagDetailComponent } from './tag-detail/tag-detail.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { DocumentComponent } from './document/document.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { FolderComponent } from './folder/folder.component';
import { FolderDetailComponent } from './folder-detail/folder-detail.component';
import { GenericSelectorComponent } from './generic-selector/generic-selector.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { TagSelectComponent } from './shared/tag-select/tag-select.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TagComponent,
    TagDetailComponent,
    CategoryDetailComponent,
    DocumentComponent,
    DocumentDetailComponent,
    FolderComponent,
    FolderDetailComponent,
    GenericSelectorComponent,
    TagSelectComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
