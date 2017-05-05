import * as angular from 'angular'
import {INavbarLoggedInMenuComponentBindings} from './navbar-logged-in-menu'
import {UserService} from '../../../services/user/user.service'
import {TopAlertService} from '../../../services/top-alert/top-alert.service'
import {IStateService} from 'angular-ui-router'
import IStyleConstant = profitelo.constants.style.IStyleConstant

export class NavbarLoggedInMenuComponentController implements INavbarLoggedInMenuComponentBindings {

  isExpertOrOrganization: boolean
  isNotificationsMenuShow: boolean = false
  areNotificationsDisplayed: boolean = false
  areInvitationsDisplayed: boolean = false
  isNotificationsTab: boolean = true
  isInvitationsTab: boolean = false

  /* @ngInject */
  constructor(private userService: UserService, private $filter: ng.IFilterService,
              private topAlertService: TopAlertService, private $state: IStateService,
              private $element: ng.IRootElementService, private $document: ng.IDocumentService,
              private $window: ng.IWindowService, private styleConstant: IStyleConstant,
              private $scope: ng.IScope) {

    this.setIsExpert()

    this.$document.bind('click', (event: Event) => {

      const notificationsMenuLink = this.$element.find('.notifications-tab-link')
      const ifNotificationsMenuClicked = this.$element.find(notificationsMenuLink).find(event.target).length > 0

      const navbarNotificationsMenu = this.$element.find('.navbar-notifications-menu')
      const navbarNotificationsMenuClicked = this.$element.find(navbarNotificationsMenu).find(event.target).length > 0

      const invitationsMenuLink = this.$element.find('.invitations-tab-link')
      const ifInvitationsMenuClicked = this.$element.find(invitationsMenuLink).find(event.target).length > 0

      const notificationsMenuHeader = this.$element.find('.notifications-menu-desktop-header')
      const ifNotificationsMenuHeaderClicked = this.$element.find(notificationsMenuHeader).find(event.target).length > 0

      if (!ifNotificationsMenuClicked || navbarNotificationsMenuClicked) {
        this.isNotificationsMenuShow = false
      }

      if (ifInvitationsMenuClicked || ifNotificationsMenuHeaderClicked) {
        this.isNotificationsMenuShow = true
      }

      angular.element(this.$window).bind('scroll', () => {
        if (this.$window.pageYOffset >= this.styleConstant.NAVBAR_HEIGHT
            && this.$window.innerWidth >= this.styleConstant.DESKTOP_WINDOW_WIDTH) {
          this.isNotificationsMenuShow = false
        }
      })
      this.$scope.$apply()
    })

    angular.element(this.$window).bind('scroll', () => {
      if (this.$window.pageYOffset >= this.styleConstant.NAVBAR_HEIGHT
        && this.$window.innerWidth >= this.styleConstant.DESKTOP_WINDOW_WIDTH) {
        this.isNotificationsMenuShow = false
      }
      this.$scope.$apply()
    })

  }

  public logout = () => {
    this.userService.logout().then(() => {
      this.$state.reload()
      this.topAlertService.success({
        message: this.$filter('translate')('LOGIN.SUCCESSFUL_LOGOUT'),
        timeout: 2
      })
    })
  }

  private setIsExpert = () => {
    this.userService.getUser().then((response) => {
      this.isExpertOrOrganization = response.isExpert || response.isCompany
    }, () => {
      this.isExpertOrOrganization = false
    })
  }

  public toggleNotificationsMenuShow = () => {
    this.isNotificationsMenuShow = !this.isNotificationsMenuShow
    this.areNotificationsDisplayed = true
    this.isNotificationsTab = true
    this.isInvitationsTab = false
  }

  public toggleInvitationsMenuShow = () => {
    this.isNotificationsMenuShow = !this.isNotificationsMenuShow
    this.areInvitationsDisplayed = true
    this.isNotificationsTab = false
    this.isInvitationsTab = true
  }

}
