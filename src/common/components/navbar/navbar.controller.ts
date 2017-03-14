import * as angular from "angular"
import {INavbarComponentBindings} from "./navbar"

export class NavbarComponentController implements INavbarComponentBindings {
  isWindowScrolling: boolean = false
  isSearchVisible: boolean = false
  elementOffsetHeight: number = 0
  isNavigationCollapsed: boolean = false
  isClientState: boolean = false
  bodyHtmlElement = angular.element(document).find('body')
  logoutAction: any

  /* @ngInject */
  constructor(private $scope: ng.IScope, private $window: ng.IWindowService){
    angular.element(this.$window).bind('scroll', () => {
      this.isWindowScrolling = (this.$window.pageYOffset > this.elementOffsetHeight)
      this.$scope.$apply()
      this.elementOffsetHeight = this.$window.pageYOffset
    })
  }

  public logout = () => {
    this.logoutAction()
  }

  public onMobileMenuCollapsed = () => {
    this.isNavigationCollapsed = !this.isNavigationCollapsed
    this.bodyHtmlElement.toggleClass("is-mobile-nav-visible")
  }

  public onSearchCollapsed = () => {
    //this.isSearchVisible is true (CSS) when resolution is bigger than 768px
    this.isSearchVisible = !this.isSearchVisible
    this.isNavigationCollapsed = false
    this.bodyHtmlElement.removeClass("is-mobile-nav-visible")
  }
}
