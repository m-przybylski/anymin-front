import {DashboardExpertComplainsListComponentController} from './complains-list.controller'

export class DashboardExpertComplainsListComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = DashboardExpertComplainsListComponentController
  template = require('./complains-list.pug')
  bindings: {[boundProperty: string]: string} = {
    headerTitle: '@'
  }
}
