// tslint:disable:readonly-array
// tslint:disable:no-empty
// tslint:disable:no-any
import { IMessengerInputBindings } from './messenger-input';

// tslint:disable:member-ordering
export class MessengerInputComponentController implements IMessengerInputBindings {

  public onSendMessage: (text: string) => void;
  public onUploadFiles: (files: File[]) => void;
  public onTyping: () => void;
  public isFileUploading: boolean;
  public inputModel = '';

  public static $inject = [];

  constructor() {
  }

  public sendMessage = (text: string): void => {
    if (text !== '') {
      this.onSendMessage(text);
      this.inputModel = '';
    }
  }

  public uploadFiles = (files: File[]): void => {
    if (!this.isFileUploading) {
      this.onUploadFiles(files);
    }
  }

  public onKeyup = (event: any): void => {
    if (event.key !== 'Enter') {
      this.onTyping();
    }
  }
}
