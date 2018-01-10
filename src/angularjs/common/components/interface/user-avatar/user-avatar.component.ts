import {UserAvatarComponentController} from './user-avatar.controller'
export class UserAvatarComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = UserAvatarComponentController
  template = require('./user-avatar.html')
  transclude: boolean = true
  bindings: {[boundProperty: string]: string} = {
    imageToken: '<'
  }
}
