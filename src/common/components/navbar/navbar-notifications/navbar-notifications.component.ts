import {NavbarNotificationsComponentController} from './navbar-notifications.controller'

export class NavbarNotificationsComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = NavbarNotificationsComponentController
  template: string = require('./navbar-notifications.pug')()
  bindings: {[boundProperty: string]: string} = {
    isNotificationsTab: '<',
    isInvitationsTab: '<',
    onClick: '<',
    invitations: '<'
  }
}
