import { Component, ElementRef, ViewChild } from '@angular/core';
import { FilesService } from 'src/app/services/files/files.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-newfile',
  templateUrl: './newfile.component.html',
  styleUrls: ['./newfile.component.scss']
})
export class NewfileComponent {
  Action: string = '';
  
  constructor(protected router: Router, protected filesService: FilesService, protected toastService: ToastService) { }

  form: FormGroup = new FormGroup({
    file: new FormControl("file.txt", [Validators.required]),
    description: new FormControl("My description")
  });

  @ViewChild("fileinput") fi: ElementRef = new ElementRef<any>(null);
  submit() {
    this.Action = "submit";

    this.filesService
      .Upload(this.form.value, this.progressHandler.bind(this))
      .subscribe((res: any) => {
        this.fi.nativeElement.value = "";
      });
  }

  onFileChange(event: Event) {
    const file = (event.target as any).files[0];

    if (file != undefined)
    {
      document.getElementById("submitButton")?.classList.remove("disabled");
    }
    else
    {
      document.getElementById("submitButton")?.classList.add("disabled");
    }

    this.form.patchValue({ file });

  }

  percentage: number = 0;
  progressHandler(percentage: number, done: boolean) {
    if (!isNaN(percentage))
      this.percentage = percentage;

    if (done) {
      this.filesService.RefreshFiles();

      console.log("Successfully uploaded");
      this.form.reset();


      setTimeout(() => {
        this.percentage = 0;
        this.router.navigate(["/files"]);

        let message = this.filesService.ResultMessage;
        if (message != "")
        {
          this.toastService.show("", message);
        }
      }, 1000);

      
    }
  }
}
