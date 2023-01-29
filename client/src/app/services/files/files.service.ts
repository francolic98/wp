import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, tap, last, endWith } from 'rxjs';


import { File, Page, Category, SortOrder } from "../../types"
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private readonly filesUrl = "/api/files/";

  Files: Observable<any[]> = new Observable<any[]>();
  CurrentPage: Page;
  ResultMessage: string = "";
  SortOrder: SortOrder = SortOrder.Default;
  

  constructor(protected http: HttpClient, protected toastService: ToastService) {
    //this._getFiles().subscribe();
    this.RefreshFiles();
    this.SortFiles();
  }

  RefreshFiles() {
    this.Files = this.http.get<any[]>(this.filesUrl)
      /*.pipe(
        tap((files: File[]) => {
          this.Files.next(files);
        })
      )*/
  }

  SortFiles()
  {
    switch (this.SortOrder) {
      case SortOrder.Default:
        this.Files = this.Files .pipe(
          map(files => files?.sort((a, b) => (a.UploadDate > b.UploadDate) ? 1 : -1))
        )
        break;
      case SortOrder.NameAToZ:
        this.Files  = this.Files .pipe(
          map(files => files?.sort((a, b) => (a.Name > b.Name) ? 1 : -1))
        )
        break;
      case SortOrder.NameZToA:
        this.Files  = this.Files .pipe(
          map(files => files?.sort((a, b) => (a.Name < b.Name) ? 1 : -1))
        )
        break;

      default:
        break;
    }
  }

  /*ShouldShow(file?: File)
  {
    if (this.CurrentPage == Page.Trash)
    {
      return file?.Categories.includes(Page.Trash.toString() as Category);
    }
    else if (this.CurrentPage == Page.Files)
    {
      return !file?.Categories.includes(Page.Trash.toString() as Category);
    }
    else
    {
      return file?.Categories.includes(this.CurrentPage!.toString() as Category);
    }
  }*/

  UploadStatus(event: any): { percentage: number, done: boolean } {
    if (event.body)
    {
      this.ResultMessage = event.body.message;
    }

    let percentage = Math.round(100 * event.loaded / event.total);
    let done = HttpEventType.Response == event.type;
    return { percentage, done };
  }

  Upload(data: { file: any }, handler: (percentage: number, done: boolean) => void): Observable<any> 
  {
    let formData: FormData = new FormData();
    formData.append("file", data.file, data.file.name);

    const req = new HttpRequest("POST", this.filesUrl, formData, { reportProgress: true });

    return this.http.request(req)
      .pipe
      (
        map(event => this.UploadStatus(event)),
        tap((status: { percentage: number, done: boolean }) => {
          handler(status.percentage, status.done);
        }),
        last()
      );
  }

  Download(_id: string) 
  {
    this.http.get(this.filesUrl + _id, { responseType: "blob", observe: "response" })
      .subscribe((res) => {
        let fileName = res.headers.get("content-disposition")?.split(";")[1].split("=")[1].slice(1, -1);
        let blob = res.body as Blob;
        let a = document.createElement("a");
        a.download = fileName!;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      });
  }

  Delete(_id: string) 
  {
    this.http.delete(this.filesUrl + _id)
      .subscribe((res) => 
      { 
        this.RefreshFiles();
        this.SortFiles();
        this.toastService.show("", (res as { message: string }).message);
      });
  }
  
}
