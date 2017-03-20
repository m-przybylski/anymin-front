import {ProfileHeaderComponentController} from './profile-header.controller'
export class ProfileHeaderComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = ProfileHeaderComponentController
  template = require('./profile-header.pug')()
  replace: true
  bindings: {[boundProperty: string]: string} = {
  }
}
