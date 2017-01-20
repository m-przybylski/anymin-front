module profitelo.components.communicator.messenger.maximized.input {

  class MessengerInputBindings {
    onSendMessage: Function
    onUploadFiles: Function
    onTyping: Function
    isFileUploading: boolean
  }

  class MessengerInputComponentController implements MessengerInputBindings {

    public onSendMessage: Function
    public onUploadFiles: Function
    public onTyping: Function
    public isFileUploading: boolean
    public inputModel: string = ''

    /* @ngInject */
    constructor() {
    }

    public sendMessage = (text) => {
      if (text !== '') {
        this.onSendMessage(text)
        this.inputModel = ''
      }
    }

    public uploadFiles = (files) => {
      if (!this.isFileUploading) {
        this.onUploadFiles(files)
      }
    }

    public onKeyup = (event) => {
      if (event.key !== 'Enter') {
        this.onTyping()
      }
    }
  }

  class MessengerInputComponent {
    templateUrl: string = 'components/communicator/messenger/maximized/messenger-input/messenger-input.tpl.html'
    controller: ng.Injectable<ng.IControllerConstructor> = MessengerInputComponentController
    bindings: {
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
