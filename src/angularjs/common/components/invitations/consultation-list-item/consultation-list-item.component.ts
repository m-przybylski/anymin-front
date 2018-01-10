import {ConsultationListItemComponentController} from './consultation-list-item.controller'

export class ConsultationListItemComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ConsultationListItemComponentController
  template = require('./consultation-list-item.html')
  bindings: {[boundProperty: string]: string} = {
    onChange: '<',
    service: '<'
  }
}
