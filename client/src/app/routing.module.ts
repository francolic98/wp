import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './components/files/files.component';
import { RouterModule, Route } from "@angular/router";
import { NewfileComponent } from './components/newfile/newfile.component';

const routes: Route[] = 
[
  { path: "", redirectTo: "files", pathMatch: "full" },
  { path: "files", component: FilesComponent },
  { path: "newfile", component: NewfileComponent },

  /*{ path: "shared", component: FilesComponent },
  { path: "pinned", component: FilesComponent },
  { path: "trash", component: FilesComponent },
  { path: "**", redirectTo: "files" }*/
]

@NgModule({
  declarations: [],
  imports: 
  [
    RouterModule.forRoot(routes)
  ],
  exports: 
  [
    RouterModule
  ]
})
export class RoutingModule { }
