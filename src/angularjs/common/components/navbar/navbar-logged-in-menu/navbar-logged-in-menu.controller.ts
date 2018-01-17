import * as angular from 'angular'
import {INavbarLoggedInMenuComponentBindings} from './navbar-logged-in-menu'
import {UserService} from '../../../services/user/user.service'
import {TopAlertService} from '../../../services/top-alert/top-alert.service'
import {StateService} from '@uirouter/angularjs'
import {ProfileApi} from 'profitelo-api-ng/api/api'
import {TranslatorService} from '../../../services/translator/translator.service'
import {GetProfileWithServicesInvitations, GetInvitation} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
import {NavbarNotificationsService} from '../navbar-notifications/navbar-notifications.service'
import {Config} from '../../../../app/config';
import {ProfiteloWebsocketService} from '../../../services/profitelo-websocket/profitelo-websocket.service'

export class NavbarLoggedInMenuComponentController implements INavbarLoggedInMenuComponentBindings {

  isExpert: boolean = false
  isExpertOrOrganization: boolean
  isNotificationsMenuShow: boolean = false
  areNotificationsDisplayed: boolean = false
  areInvitationsDisplayed: boolean = false
  isNotificationsTab: boolean = true
  isInvitationsTab: boolean = false
  isHelpMenuShow: boolean = false
  isAvailbilityMenuShow: boolean = false
  isAnyMenuShow: boolean = false
  notificationCounter?: number
  invitations: GetProfileWithServicesInvitations[] = []
  public isPlatformForExpert: boolean = Config.isPlatformForExpert

  static $inject = ['userService', 'translatorService', 'topAlertService', '$state', '$element', '$document',
    '$window', '$scope', '$log', 'ProfileApi', 'navbarNotificationsService', 'profiteloWebsocket'];

    constructor(private userService: UserService,
              private translatorService: TranslatorService,
              private topAlertService: TopAlertService,
              private $state: StateService,
              private $element: ng.IRootElementService,
              private $document: ng.IDocumentService,
              private $window: ng.IWindowService,
              private $scope: ng.IScope,
              private $log: ng.ILogService,
              private ProfileApi: ProfileApi,
              navbarNotificationsService: NavbarNotificationsService,
              profiteloWebsocket: ProfiteloWebsocketService) {

      navbarNotificationsService.onInvitationsResolved(this.fetchInvitations)
      profiteloWebsocket.onNewInvitation(this.fetchInvitations)
  }

  $onInit(): void {
    this.setIsExpert()

    this.$document.bind('click', (event: Event) => {
      const ifTargetClicked = this.$element.find(event.target).length > 0
      if (!ifTargetClicked) {
        this.isNotificationsMenuShow = false
        this.isHelpMenuShow = false
        this.isAnyMenuShow = false
        this.isAvailbilityMenuShow = false
      }
      this.$scope.$apply()
    })

    angular.element(this.$window).bind('scroll', () => {
      if (this.$window.pageYOffset >= Config.styles.NAVBAR_HEIGHT
        && this.$window.innerWidth >= Config.styles.DESKTOP_WINDOW_WIDTH) {
        this.isNotificationsMenuShow = false
        this.isHelpMenuShow = false
      }
      this.$scope.$apply()
    })

    this.fetchInvitations()
  }

  private fetchInvitations = (): void => {
    this.ProfileApi.getProfilesInvitationsRoute().then((response) => {
      this.invitations = response.filter((profileInvitation) =>
        _.find(profileInvitation.services, (service) => service.invitation.status === GetInvitation.StatusEnum.NEW))
      this.areNotificationsDisplayed = this.invitations.length > 0
      this.notificationCounter = this.invitations.length
    }, (error) => {
      this.$log.error(error)
    })
  }

  $onDestroy(): void {
    this.$document.unbind('click')
    angular.element(this.$window).unbind('scroll')
  }

  public logout = (): void => {
    this.userService.logout().then(() => {
      this.$state.reload()
      this.topAlertService.success({
        message: this.translatorService.translate('LOGIN.SUCCESSFUL_LOGOUT'),
        timeout: 2
      })
    })
  }

  private setIsExpert = (): void => {
    this.userService.getUser().then((response) => {
      this.isExpert = response.isExpert
      this.isExpertOrOrganization = response.isExpert || response.isCompany
    }, () => {
      this.isExpertOrOrganization = false
      this.isExpert = false
    })
  }

  public toggleNotificationsMenuShow = (): void => {
    this.isNotificationsMenuShow = !this.isNotificationsMenuShow
    this.isAnyMenuShow = !this.isAnyMenuShow
  }

  public toggleNotificationsTabShow = (): void => {
    this.toggleNotificationsMenuShow()
    this.isNotificationsTab = true
    this.isInvitationsTab = false
    this.isHelpMenuShow = false
  }

  public toggleInvitationsTabShow = (): void => {
    this.toggleNotificationsMenuShow()
    this.areInvitationsDisplayed = true
    this.isNotificationsTab = false
    this.isInvitationsTab = true
  }

  public toggleHelpMenuShow = (): void => {
    this.isHelpMenuShow = !this.isHelpMenuShow
    this.isNotificationsMenuShow = false
    this.isAnyMenuShow = !this.isAnyMenuShow
  }

  public toggleAvailbilityNav = (): void => {
    this.isHelpMenuShow = false
    this.isNotificationsMenuShow = false
    this.isAvailbilityMenuShow = !this.isAvailbilityMenuShow
  }

}
