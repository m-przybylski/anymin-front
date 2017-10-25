import * as angular from 'angular'
import {INavbarLoggedInMenuComponentBindings} from './navbar-logged-in-menu'
import {UserService} from '../../../services/user/user.service'
import {TopAlertService} from '../../../services/top-alert/top-alert.service'
import {IStateService} from 'angular-ui-router'
import IStyleConstant = profitelo.constants.style.IStyleConstant
import {TranslatorService} from '../../../services/translator/translator.service'

export class NavbarLoggedInMenuComponentController implements INavbarLoggedInMenuComponentBindings {

  isExpertOrOrganization: boolean
  isNotificationsMenuShow: boolean = false
  areNotificationsDisplayed: boolean = false
  areInvitationsDisplayed: boolean = false
  isNotificationsTab: boolean = true
  isInvitationsTab: boolean = false
  isHelpMenuShow: boolean = false
  isAnyMenuShow: boolean = false

  /* @ngInject */
  constructor(private userService: UserService,
              private translatorService: TranslatorService,
              private topAlertService: TopAlertService,
              private $state: IStateService,
              private $element: ng.IRootElementService,
              private $document: ng.IDocumentService,
              private $window: ng.IWindowService,
              private styleConstant: IStyleConstant,
              private $scope: ng.IScope) {

  }

  $onInit(): void {
    this.setIsExpert()

    this.$document.bind('click', (event: Event) => {

      const ifTargetClicked = this.$element.find(event.target).length > 0
      if (!ifTargetClicked) {
        this.isNotificationsMenuShow = false
        this.isHelpMenuShow = false
        this.isAnyMenuShow = false
      }
      this.$scope.$apply()
    })

    angular.element(this.$window).bind('scroll', () => {
      if (this.$window.pageYOffset >= this.styleConstant.NAVBAR_HEIGHT
        && this.$window.innerWidth >= this.styleConstant.DESKTOP_WINDOW_WIDTH) {
        this.isNotificationsMenuShow = false
        this.isHelpMenuShow = false
      }
      this.$scope.$apply()
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
      this.isExpertOrOrganization = response.isExpert || response.isCompany
    }, () => {
      this.isExpertOrOrganization = false
    })
  }

  public toggleNotificationsMenuShow = (): void => {
    this.isNotificationsMenuShow = !this.isNotificationsMenuShow
    this.isAnyMenuShow = !this.isAnyMenuShow
  }

  public toggleNotificationsTabShow = (): void => {
    this.toggleNotificationsMenuShow()
    this.areNotificationsDisplayed = true
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

}
