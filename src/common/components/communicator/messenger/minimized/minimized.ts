import * as angular from "angular"
import {MessengerMinimizedComponent} from "./minimized.component"

export interface IMessengerMinimizedComponentBindings {
  onMessageClick: (msg: any) => void
}

const messengerMinimizedModule = angular.module('profitelo.components.communicator.messenger.minimized', [])
  .component('messengerMinimized', new MessengerMinimizedComponent)
  .name

export default messengerMinimizedModule;
