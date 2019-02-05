import { Input, Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

export enum MessengerInputUploadStatus {
  UPLOADING,
  TO_BIG_SIZE,
  TO_SMALL_SIZE,
  INCORRECT_FILE,
  ERROR,
}

@Component({
  selector: 'am-core-messenger-input',
  templateUrl: 'messenger-input.component.html',
  styleUrls: ['messenger-input.component.sass'],
})
export class MessengerInputComponent {
  @Input()
  public isFileUploading = false;
  @Input()
  public set toggle(value: boolean) {
    if (value) {
      this.chatInput.nativeElement.focus();
    }
  }
  @Output()
  public sendMessage = new EventEmitter<string>();
  @Output()
  public uploadFiles = new EventEmitter<File>();
  @Output()
  public typing = new EventEmitter<void>();
  @Output()
  public uploadingError = new EventEmitter<string>();

  public inputModel = '';

  @ViewChild('chatInput')
  public chatInput: ElementRef;

  public onSendMessage(text: string): void {
    if (text !== '') {
      this.sendMessage.emit(text);
      this.inputModel = '';
    }
  }

  public onUploadFiles(file: File): void {
    if (!this.isFileUploading) {
      this.uploadFiles.emit(file);
    }
  }

  public onKeyup(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      this.typing.emit();
    }
  }

  public onShowFileUploadStatus(statusMsg: string): void {
    this.uploadingError.emit(statusMsg);
  }
}
