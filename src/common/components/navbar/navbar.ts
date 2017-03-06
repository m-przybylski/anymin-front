namespace profitelo.components.navbar {

  interface INavbarComponentBindings extends ng.IController {
  }

  class NavbarComponentController implements INavbarComponentBindings {
    isWindowScrolling: boolean = false
    isSearchVisible: boolean = false
    elementOffsetHeight: number = 0
    isNavigationCollapsed: boolean = false
    isClientState: boolean = false
    bodyHtmlElement = angular.element(document).find('body')

    /* @ngInject */
    constructor(private $scope: ng.IScope, private $window: ng.IWindowService){
      angular.element(this.$window).bind('scroll', () => {
        this.isWindowScrolling = (this.$window.pageYOffset > this.elementOffsetHeight)
        this.$scope.$apply()
        this.elementOffsetHeight = this.$window.pageYOffset
      })
    }

    public onMobileMenuCollapsed = () => {
      this.isNavigationCollapsed = !this.isNavigationCollapsed
      this.bodyHtmlElement.toggleClass("is-mobile-nav-visible")
    }

    public onSearchCollapsed = () => {
      this.isSearchVisible = !this.isSearchVisible
      this.isNavigationCollapsed = false
      this.bodyHtmlElement.removeClass("is-mobile-nav-visible")
    }
  }

  class NavbarComponent implements ng.IComponentOptions {
    controller: ng.Injectable<ng.IControllerConstructor> = NavbarComponentController
    templateUrl: string = 'components/navbar/navbar.tpl.html'
    bindings: {[boundProperty: string]: string} = {

    }
  }

  angular.module('profitelo.components.navbar', [
    'pascalprecht.translate'
  ])
  .component('navbar', new NavbarComponent())
}
