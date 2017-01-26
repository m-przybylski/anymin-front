namespace profitelo.components.communicator.messenger.maximized.groupedMessages {

  class GroupedMessagesComponentBindings {
    messages: Array<any>
    participantAvatar: string
  }

  class GroupedMessagesComponentController implements ng.IController, GroupedMessagesComponentBindings {

    public messages: Array<any> = []
    public participantAvatar: string = ''
    public isMine: boolean = false

    /* @ngInject */
    constructor() {
    }

    $onInit = () => {
      const message = this.messages[0]
      this.isMine = (angular.isDefined(message) && angular.isDefined(message.isMine) && message.isMine)
    }
  }

  class GroupedMessagesComponent {
    templateUrl: string = 'components/communicator/messenger/maximized/grouped-messages/grouped-messages.tpl.html'
    controller: ng.Injectable<ng.IControllerConstructor> = GroupedMessagesComponentController
    bindings: {[boundProperty: string]: string} = {
      messages: '<',
      participantAvatar: '@'
    }
  }

  angular.module('profitelo.components.communicator.messenger.maximized.grouped-messages', [
    'profitelo.filters.message-filter'
  ])
  .component('groupedMessages', new GroupedMessagesComponent())
}