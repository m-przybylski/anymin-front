import {INavbarNotificationsComponentBindings} from './navbar-notifications'
import {ModalsService} from '../../../services/modals/modals.service'
import * as angular from 'angular'

export class NavbarNotificationsComponentController implements INavbarNotificationsComponentBindings {

  isNotificationsTab: boolean = true
  isInvitationsTab: boolean = false
  areInvitationsDisplayed: boolean = false
  areInvitations: boolean = true
  onClick: () => void
  buttonCallback: () => void

  /* @ngInject */

  constructor(private modalsService: ModalsService,
              private $element: ng.IRootElementService) {

    this.buttonCallback = () => {
     if (this.onClick && !angular.isFunction(this.onClick)) {
       throw new Error('onClick is not a function')
     }
      this.onClick()
    }

  }

  public showNotifications = () => {
    this.isNotificationsTab = true
    this.isInvitationsTab = false
  }

  public showInvitations = () => {
    this.isNotificationsTab = false
    this.isInvitationsTab = true
    this.areInvitationsDisplayed = true
  }

  public openNotificationDescriptions = () => {
    this.modalsService.createInvitationsModal()
  }

  public markAsRead = (event: Event) => {
    if (!event) {
      throw new Error('Event not found')
    }
    // TODO: remove on api logic
    this.$element.find(event.currentTarget)[0].classList.add('is-read')
  }

  public onNotificationClick = (event: Event) => {
    this.openNotificationDescriptions()
    this.markAsRead(event)
  }

}
