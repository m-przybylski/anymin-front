namespace profitelo.components.communicator.messenger.maximized.input {

  export interface IMessengerInputBindings {
    onSendMessage: Function
    onUploadFiles: Function
    onTyping: Function
    isFileUploading: boolean
  }

  export class MessengerInputComponentController implements IMessengerInputBindings {

    public onSendMessage: Function
    public onUploadFiles: Function
    public onTyping: Function
    public isFileUploading: boolean
    public inputModel: string = ''

    /* @ngInject */
    constructor() {
    }

    public sendMessage = (text: string) => {
      if (text !== '') {
        this.onSendMessage(text)
        this.inputModel = ''
      }
    }

    public uploadFiles = (files: Array<File>) => {
      if (!this.isFileUploading) {
        this.onUploadFiles(files)
      }
    }

    public onKeyup = (event: any) => {
      if (event.key !== 'Enter') {
        this.onTyping()
      }
    }
  }

  class MessengerInputComponent {
    templateUrl: string = 'components/communicator/messenger/maximized/messenger-input/messenger-input.tpl.html'
    controller: ng.Injectable<ng.IControllerConstructor> = MessengerInputComponentController
    bindings: {[boundProperty: string]: string} = {
      onSendMessage: '<',
      onUploadFiles: '<',
      onTyping: '<',
      isFileUploading: '<'
    }
  }

  angular.module('profitelo.components.communicator.messenger.maximized.messenger-input', [
    'pascalprecht.translate'
  ])
  .component('messengerInput', new MessengerInputComponent())
}
