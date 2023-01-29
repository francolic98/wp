import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { FilesComponent } from './components/files/files.component';
import { FilecardComponent } from './components/filecard/filecard.component';
import { FadeinDirective } from './directives/fadein.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { NewfileComponent } from './components/newfile/newfile.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './components/toasts/toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    FilesComponent,
    FilecardComponent,
    NewfileComponent,
    ToastsComponent,
    FadeinDirective
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
