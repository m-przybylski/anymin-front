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

      const ifTargetClicked = this.$element.find(event.target).length > 0
      if (!ifTargetClicked) {
        this.isNotificationsMenuShow = false
      }
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
  }

  public toggleNotificationsTabShow = () => {
    this.toggleNotificationsMenuShow()
    this.areNotificationsDisplayed = true
    this.isNotificationsTab = true
    this.isInvitationsTab = false
  }

  public toggleInvitationsTabShow = () => {
    this.toggleNotificationsMenuShow()
    this.areInvitationsDisplayed = true
    this.isNotificationsTab = false
    this.isInvitationsTab = true
  }

}
