import { Component, Input } from '@angular/core';
import { faDownload, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FilesService } from 'src/app/services/files/files.service';
import { File } from '../../types';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastService } from 'src/app/services/toast/toast.service';
import mb from 'node-mb';

@Component({
    selector: 'app-filecard',
    templateUrl: './filecard.component.html',
    styleUrls: ['./filecard.component.scss']
})
export class FilecardComponent {
    @Input() File?: (File | undefined);
    downloadIcon = faDownload
    shareIcon = faShare
    trashIcon = faTrash

    constructor (protected filesService: FilesService, protected toastService: ToastService, protected clipboard: Clipboard) { }

    Delete()
    {
        this.filesService.Delete(this.File?._id ?? "");
        
    }

    Download()
    {
        this.filesService.Download(this.File?._id ?? "");
    }

    Share()
    {
        this.clipboard.copy(`${location.origin}/api/files/${this.File?._id ?? ""}`);
        this.toastService.show("", "Link copied to clipboard");
    }

    ConvertToMB(kb: number)
    {
        return mb(`${kb}b`).toPrecision(3);
    }

    GetFileIcon(fileName: string) {
        var result = "";
        var extension = fileName?.split('.')?.pop()?.toLowerCase();

        switch (extension) {
            case "mp3":
            case "wav":
            case "flac":
            case "mid":
                result = "🎵";
                break;
            case "jpg":
            case "jpeg":
            case "png":
                result = "📷";
                break;
            case "gif":
                result = "🎞️";
                break;
            case "docx":
            case "doc":
                result = "📘";
                break;
            case "pdf":
                result = "📕";
                break;
            case "xlsx":
                result = "📊";
                break;
            case "mp4":
            case "mkv":
            case "avi":
                result = "🎥";
                break;
            case "txt":
                result = "📄";
                break;
            case "exe":
            case "bat":
            case "vbs":
                result = "🛠️";
                break;
            case "zip":
            case "rar":
            case "7z":
            case "tar":
                result = "🗄️";
                break;
            case "iso":
                result = "📀";
                break;
            case "dll":
                result = "⚙️";
                break;
            case "json":
            case "xml":
                result = "🧾";
                break;
            default:
                result = "🗋"
                break;
        }

        return result;
    }
}
