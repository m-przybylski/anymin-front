import {ProfileHeaderEditComponentController} from './profile-header-edit.controller'

export class ProfileHeaderEditComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ProfileHeaderEditComponentController
  template = require('./profile-header-edit.pug')()
  bindings: {[boundProperty: string]: string} = {
    profileDetails: '<',
    profileType: '<',
    onDelete: '<'
  }
}
