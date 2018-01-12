import * as angular from 'angular'
import {INavbarComponentBindings} from './navbar'
import {UserService} from '../../services/user/user.service'
import {Config} from '../../../app/config';

export class NavbarComponentController implements INavbarComponentBindings {
  isWindowScrollBottom: boolean = false
  isCollapsed: boolean = false
  isSearchVisible: boolean = false
  elementOffsetHeight: number = 0
  isNavigationCollapsed: boolean = false
  isLoggedIn: boolean
  searchInputQueryValue: string
  navbarStyle: {
    transform: string
  }
  public onLogoLink: string = ''
  public isPlatformForExpert: boolean = Config.isPlatformForExpert

  static $inject = ['$scope', '$window', '$element', 'userService', '$document'];

    constructor(private $scope: ng.IScope, private $window: ng.IWindowService, private $element: ng.IRootElementService,
              private userService: UserService, private $document: ng.IDocumentService) {

    angular.element(this.$window).bind('scroll', () => {
      if (this.$window.pageYOffset <= Config.styles.NAVBAR_HEIGHT) {
        this.isCollapsed = false
        this.navbarStyle = {
          transform: `translateY(${-this.$window.pageYOffset}px)`
        }
        this.isWindowScrollBottom = (this.$window.pageYOffset > this.elementOffsetHeight)
      } else {
        this.isCollapsed = true
        this.navbarStyle = {
          transform: ''
        }
      }

      if (!this.isWindowScrollBottom) {
        this.navbarStyle = {
          transform: 'translateY(0)'
        }
      }

      this.isWindowScrollBottom = (this.$window.pageYOffset > this.elementOffsetHeight)
      this.$scope.$apply()
      this.elementOffsetHeight = this.$window.pageYOffset
    })

    this.setNavbarStatus()

    this.$document.bind('click', (event: Event) => {
      const navigation = this.$element.find('.mobile-nav')
      const ifTargetClicked = navigation.find(event.target).length > 0

      if (!ifTargetClicked) {
        this.isNavigationCollapsed = false
      }

      const notificationsMenuLink = this.$element.find('.notifications-tab-link')
      const ifNotificationsMenuClicked = notificationsMenuLink.find(event.target).length > 0
      const invitationsMenuLink = this.$element.find('.invitations-tab-link')
      const ifInvitationsMenuClicked = invitationsMenuLink.find(event.target).length > 0
      const helpMenuLink = this.$element.find('.help-tab-link')
      const ifHelpMenuClicked = helpMenuLink.find(event.target).length > 0

      if (ifNotificationsMenuClicked || ifInvitationsMenuClicked || ifHelpMenuClicked) {
        this.isNavigationCollapsed = true
      }

      this.$scope.$apply()
    })
  }

  $onInit = (): void => {
    Config.isPlatformForExpert ? this.onLogoLink = 'app.dashboard.expert.activities' : this.onLogoLink = 'app.home'
  }

  public onMobileMenuCollapsed = (): void => {
    this.isNavigationCollapsed = !this.isNavigationCollapsed
  }

  public onSearchCollapsed = (): void => {
    if (!Config.isPlatformForExpert)
      /* this.isSearchVisible is overwrite in CSS when resolution is bigger than 768px */
      this.isSearchVisible = !this.isSearchVisible
      this.isNavigationCollapsed = false
  }

  private setNavbarStatus = (): void => {
    this.userService.getUser().then(() => {
      this.isLoggedIn = true
    }, () => {
      this.isLoggedIn = false
    })
  }

}
