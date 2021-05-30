import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UploadComponent} from './pages/upload/upload.component';
import {HomeComponent} from './pages/home/home.component';
import { DndUploadComponent } from './components/dnd-upload/dnd-upload.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import { NewDocsComponent } from './pages/new-docs/new-docs.component';
import { DocumentCardComponent } from './components/document-card/document-card.component';
import { ChipsComponent } from './components/chips/chips.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { EditComponent } from './pages/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    HomeComponent,
    DndUploadComponent,
    NewDocsComponent,
    DocumentCardComponent,
    ChipsComponent,
    AutocompleteComponent,
    EditComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
