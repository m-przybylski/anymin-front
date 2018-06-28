// tslint:disable:no-require-imports
import { MessengerInputComponentController } from './messenger-input.controller';

// tslint:disable:member-ordering
export class MessengerInputComponent {
  public template = require('./messenger-input.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = MessengerInputComponentController;
  public bindings: { [boundProperty: string]: string } = {
    onSendMessage: '<',
    onUploadFiles: '<',
    onTyping: '<',
    isFileUploading: '<'
  };
}
