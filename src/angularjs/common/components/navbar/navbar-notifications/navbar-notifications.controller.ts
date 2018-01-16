import {INavbarNotificationsComponentBindings} from './navbar-notifications'
import {ModalsService} from '../../../services/modals/modals.service'
import {GetProfileWithServicesInvitations} from 'profitelo-api-ng/model/models'
import * as angular from 'angular'
import {Config} from '../../../../../config';

export class NavbarNotificationsComponentController implements INavbarNotificationsComponentBindings {

  isNotificationsTab: boolean = true
  isInvitationsTab: boolean = false
  areInvitationsDisplayed: boolean = false
  areInvitations: boolean = true
  onClick: () => void
  buttonCallback: () => void
  invitations: GetProfileWithServicesInvitations[]
  public isPlatformForExpert: boolean = Config.isPlatformForExpert

  static $inject = ['modalsService', '$element'];

    constructor(private modalsService: ModalsService,
              private $element: ng.IRootElementService) {

    this.buttonCallback = (): void => {
      if (this.onClick && !angular.isFunction(this.onClick)) {
        throw new Error('onClick is not a function')
      }
      this.onClick()
    }
  }

  $onChanges(): void {
    this.areInvitations = this.invitations.length > 0
  }

  public showNotifications = (): void => {
    this.isNotificationsTab = true
    this.isInvitationsTab = false
  }

  public showInvitations = (): void => {
    this.isNotificationsTab = false
    this.isInvitationsTab = true
    this.areInvitationsDisplayed = true
  }

  public openNotificationDescriptions = (): void => {
    this.modalsService.createInvitationsModal()
  }

  public markAsRead = (event: Event): void => {
    if (!event) {
      throw new Error('Event not found')
    }
    // TODO: remove on api logic
    this.$element.find(event.currentTarget)[0].classList.add('is-read')
  }

  public onInvitationClick = (invitation: GetProfileWithServicesInvitations, event: Event): void => {
    this.modalsService.createInvitationsModal(invitation)
    this.markAsRead(event)
  }

}
