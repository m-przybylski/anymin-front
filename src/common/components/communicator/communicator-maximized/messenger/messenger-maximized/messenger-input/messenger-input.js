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
      this.onUploadFiles(files)
    }

    this.onKeyup = (event) => {
      if (event.key !== 'Enter') {
        this.onTyping()
      }
    }
    
    return this
  }

  const component = {
    templateUrl: 'components/communicator/communicator-maximized/messenger/messenger-maximized/messenger-input/messenger-input.tpl.html',
    controller: controller,
    bindings: {
      onSendMessage: '<',
      onUploadFiles: '<',
      onTyping: '<'
    }
  }

  angular.module('profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.messenger-input', [
    'pascalprecht.translate'
  ])
    .component('messengerInput', component)

}())
