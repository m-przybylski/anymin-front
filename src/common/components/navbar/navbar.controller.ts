import * as angular from "angular"
import {INavbarComponentBindings} from "./navbar"
import {UserService} from "../../services/user/user.service"

export class NavbarComponentController implements INavbarComponentBindings {
  isWindowScrolling: boolean = false
  isSearchVisible: boolean = false
  elementOffsetHeight: number = 0
  isNavigationCollapsed: boolean = false
  isLoggedIn: boolean
  searchModel: string
  bodyHtmlElement = angular.element(document).find('body')

  /* @ngInject */
  constructor(private $scope: ng.IScope, private $window: ng.IWindowService, private $element: any,
              private userService: UserService, private $document: ng.IDocumentService){
    angular.element(this.$window).bind('scroll', () => {
      this.isWindowScrolling = (this.$window.pageYOffset > this.elementOffsetHeight)
      this.$scope.$apply()
      this.elementOffsetHeight = this.$window.pageYOffset
    })

    this.setNavbarStatus()

    this.$document.bind('click', (event: any) => {
      let nanigation = angular.element(this.$element).find('.mobile-nav')
      let ifTargetClicked = angular.element(nanigation).find(event.target).length > 0

      if (!ifTargetClicked) {
        this.isNavigationCollapsed = false
        this.bodyHtmlElement.removeClass("is-mobile-nav-visible")
      }

      this.$scope.$apply()
    })
  }

  public onMobileMenuCollapsed = () => {
      this.isNavigationCollapsed = !this.isNavigationCollapsed
      this.bodyHtmlElement.toggleClass("is-mobile-nav-visible")
  }

  public onSearchCollapsed = () => {
    /* this.isSearchVisible is overwrite in CSS when resolution is bigger than 768px */
    this.isSearchVisible = !this.isSearchVisible
    this.isNavigationCollapsed = false
    this.bodyHtmlElement.removeClass("is-mobile-nav-visible")
  }

  private setNavbarStatus = (): void => {
    this.userService.getUser().then(() => {
      this.isLoggedIn = true
    }, () => {
      this.isLoggedIn = false
    })
  }
}
