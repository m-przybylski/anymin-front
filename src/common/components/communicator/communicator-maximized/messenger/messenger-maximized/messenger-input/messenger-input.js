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

    this.uploadFile = () => {
      alert('Not implemented yet')
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
      onUploadFile: '<',
      onTyping: '<'
    }
  }

  angular.module('profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.messenger-input', [

  ])
    .component('messengerInput', component)

}())
