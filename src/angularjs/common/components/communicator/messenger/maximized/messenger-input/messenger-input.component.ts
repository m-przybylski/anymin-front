import {MessengerInputComponentController} from './messenger-input.controller'

export class MessengerInputComponent {
  template = require('./messenger-input.html')
  controller: ng.Injectable<ng.IControllerConstructor> = MessengerInputComponentController
  bindings: { [boundProperty: string]: string } = {
    onSendMessage: '<',
    onUploadFiles: '<',
    onTyping: '<',
    isFileUploading: '<'
  }
}
