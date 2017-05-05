import {INavbarNotificationsComponentBindings} from './navbar-notifications'
import {ModalsService} from '../../../services/modals/modals.service'

export class NavbarNotificationsComponentController implements INavbarNotificationsComponentBindings {

  isNotificationsTab: boolean
  isInvitationsTab: boolean
  areInvitationsDisplayed: boolean = false
  areInvitations: boolean = true

  /* @ngInject */

  constructor(private modalsService: ModalsService) {}

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

}
