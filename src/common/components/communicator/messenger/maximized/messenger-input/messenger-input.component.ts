import {MessengerInputComponentController} from './messenger-input.controller'

export class MessengerInputComponent {
  template = require('./messenger-input.pug')()
  controller: ng.Injectable<ng.IControllerConstructor> = MessengerInputComponentController
  bindings: { [boundProperty: string]: string } = {
    onSendMessage: '<',
    onUploadFiles: '<',
    onTyping: '<',
    isFileUploading: '<'
  }
}
