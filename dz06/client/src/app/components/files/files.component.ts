import { Component, Input, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { File, Page, Category, SortOrder } from '../../types';
import { FilesService } from 'src/app/services/files/files.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {
  CurrentPage?: Page;
  Action: string;

  //Files$: BehaviorSubject<File[] | null>;

  SortOrder: any = SortOrder;
  _sortOrder: SortOrder = SortOrder.Default;
  SortDropdownLabel: string = "Default";

  /*PageTitles: { [id: string]: string } = 
  {
    "files": "Here you can find all your <b>files</b>",
    "shared": "Items you've <b>shared</b> with someone",
    "pinned": "You can easily access <b>pinned</b> items",
    "trash": "Items in <b>trash</b> will be removed after 15 days"
  }*/

  constructor(private router: Router, protected filesService: FilesService)
  {
    filesService.CurrentPage = router.routerState.snapshot.url.split('/').at(-1) as Page;
    this.Action = "page_" + this.CurrentPage;
  }

  SortFiles()
  {
    this.filesService.SortOrder = this._sortOrder;
    this.filesService.SortFiles();
  }
}
