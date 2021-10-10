import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadComponent} from "./pages/upload/upload.component";
import {HomeComponent} from "./pages/home/home.component";
import {NewDocsComponent} from "./pages/new-docs/new-docs.component";
import {EditComponent} from "./pages/edit/edit.component";
import {BrowseComponent} from "./pages/browse/browse.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'new', component: NewDocsComponent},
  {path: 'edit', component: EditComponent},
  {path: 'browse', component: BrowseComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
