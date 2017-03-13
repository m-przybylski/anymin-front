import {MoneyDto} from "../../../api/model/MoneyDto"
import {IMessengerComponentBindings} from "./messenger"

export class MessengerComponentController implements ng.IController, IMessengerComponentBindings {

  callCost: MoneyDto
  isMessenger: boolean
  callLength: number

  /* @ngInject */
  constructor() {
  }

  public minimizeMessenger = () =>
    this.isMessenger = false

  public maximizeMessenger = () =>
    this.isMessenger = true
}
