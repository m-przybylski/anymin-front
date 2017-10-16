import {INavbarNotificationsComponentBindings} from './navbar-notifications'
import {ModalsService} from '../../../services/modals/modals.service'
import {ProfileApi} from 'profitelo-api-ng/api/api'
import {GetProfileWithServicesInvitations, GetInvitation} from 'profitelo-api-ng/model/models'
import * as angular from 'angular'

export class NavbarNotificationsComponentController implements INavbarNotificationsComponentBindings {

  isNotificationsTab: boolean = true
  isInvitationsTab: boolean = false
  areInvitationsDisplayed: boolean = false
  areInvitations: boolean = true
  isLoading: boolean = true
  onClick: () => void
  buttonCallback: () => void
  invitations: GetProfileWithServicesInvitations[] = []
  /* @ngInject */

  constructor(private modalsService: ModalsService,
              private ProfileApi: ProfileApi,
              private $element: ng.IRootElementService) {

    this.buttonCallback = (): void => {
      if (this.onClick && !angular.isFunction(this.onClick)) {
        throw new Error('onClick is not a function')
      }
      this.onClick()
    }
  }

  $onInit(): void {
    this.ProfileApi.getProfilesInvitationsRoute().then((response) => {
      this.invitations = response.filter((profileInvitations) =>
        profileInvitations.services.forEach((service) => service.invitation.status === GetInvitation.StatusEnum.NEW))

      this.areInvitations = this.invitations.length > 0
      this.isLoading = false
    }, (_error) => {
      this.isLoading = false
      this.areInvitations = false
    })
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
