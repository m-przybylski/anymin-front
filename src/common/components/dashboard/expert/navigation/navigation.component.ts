import {ExpertNavigationComponentController} from './navigation.controller'

export class ExpertNavigationComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = ExpertNavigationComponentController
  template = require('./navigation.pug')()
  replace: true
  bindings: {
    stateNames: '<'
  }
}
