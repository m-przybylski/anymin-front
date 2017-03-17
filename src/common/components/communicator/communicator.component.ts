import {CommunicatorComponentController} from './communicator.controller'

export class CommunicatorComponent implements ng.IComponentOptions {

  controller: ng.Injectable<ng.IControllerConstructor> = CommunicatorComponentController
  template = require('./communicator.pug')()
}
