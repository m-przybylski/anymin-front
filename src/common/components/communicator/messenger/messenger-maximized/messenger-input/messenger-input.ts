(function() {

  /* @ngInject */
  function controller() {

    this.inputModel = ''
    
    this.sendMessage = (text) => {
      if (text !== '') {
        this.onSendMessage(text)
        this.inputModel = ''
      }
    }
    
    this.uploadFiles = (files) => {
      if (!this.isFileUploading) {
        this.onUploadFiles(files)
      }
    }

    this.onKeyup = (event) => {
      if (event.key !== 'Enter') {
        this.onTyping()
      }
    }
    
    return this
  }

  const component = {
    templateUrl: 'components/communicator/messenger/messenger-maximized/messenger-input/messenger-input.tpl.html',
    controller: controller,
    bindings: {
      onSendMessage: '<',
      onUploadFiles: '<',
      onTyping: '<',
      isFileUploading: '<'
    }
  }

  angular.module('profitelo.components.communicator.messenger.messenger-maximized.messenger-input', [
    'pascalprecht.translate'
  ])
    .component('messengerInput', component)

}())
