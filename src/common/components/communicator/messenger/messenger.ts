import * as angular from "angular"
import "angular-sanitize"
import {MoneyDto} from "profitelo-api-ng/model/models"
import {MessengerService} from "./messenger.service"
import callbacksModule from "../../../services/callbacks/callbacks"
import soundsModule from "../../../services/sounds/sounds"
import {MessengerComponent} from "./messenger.component"
import messengerMinimizedModule from "./minimized/minimized"
import messengerMaximizedModule from "./maximized/maximized"

export interface IMessengerComponentBindings {
  callCost: MoneyDto
  isMessenger: boolean
  callLength: number
}

const messengerModule = angular.module('profitelo.components.communicator.messenger', [
  'ngSanitize',
  callbacksModule,
  soundsModule,
  messengerMaximizedModule,
  messengerMinimizedModule
])
  .config(($qProvider: ng.IQProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('messengerService', MessengerService)
  .component('messenger', new MessengerComponent)
  .name

export default messengerModule;
