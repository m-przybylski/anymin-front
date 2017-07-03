import {ConsultationListItemComponentController} from './consultation-list-item.controller'

export class ConsultationListItemComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ConsultationListItemComponentController
  template = require('./consultation-list-item.pug')()
  bindings: {[boundProperty: string]: string} = {
    onChange: '<',
    service: '<'
  }
}
