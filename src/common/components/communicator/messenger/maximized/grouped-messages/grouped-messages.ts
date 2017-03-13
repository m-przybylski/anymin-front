import * as angular from "angular"
import filtersModule from "../../../../../filters/filters"

export interface IGroupedMessagesComponentBindings {
  messages: Array<any>
  participantAvatar: string
}

export class GroupedMessagesComponentController implements ng.IController, IGroupedMessagesComponentBindings {

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
  template = require("./grouped-messages.jade")()
  controller: ng.Injectable<ng.IControllerConstructor> = GroupedMessagesComponentController
  bindings: {[boundProperty: string]: string} = {
    messages: '<',
    participantAvatar: '@'
  }
}

angular.module('profitelo.components.communicator.messenger.maximized.grouped-messages', [
  filtersModule
])
  .component('groupedMessages', new GroupedMessagesComponent())
