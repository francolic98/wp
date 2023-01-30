import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { File, Page } from './types';
import { FilesService } from './services/files/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title = 'client';
  
}
