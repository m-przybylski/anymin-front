import {ExpertActivityComponentController} from './activity.controller'

export class ExpertActivityComponent implements ng.IComponentOptions {
  template = require('./activity.pug')
  controller: ng.Injectable<ng.IControllerConstructor> = ExpertActivityComponentController
  bindings: {[boundProperty: string]: string} = {
    activity: '<'
  }
}
