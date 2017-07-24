import * as angular from 'angular'
import {INavbarLoggedOutMenuComponentBindings} from './navbar-logged-out-menu'
import IStyleConstant = profitelo.constants.style.IStyleConstant

export class NavbarLoggedOutMenuComponentController implements INavbarLoggedOutMenuComponentBindings {

  isHelpMenuShow: boolean = false

  /* @ngInject */
  constructor(private $document: ng.IDocumentService, private $element: ng.IRootElementService,
              private $scope: ng.IScope, private $window: ng.IWindowService,
              private styleConstant: IStyleConstant) {

    this.$document.bind('click', (event: Event) => {

      const ifTargetClicked = this.$element.find(event.target).length > 0
      if (!ifTargetClicked) {
        this.isHelpMenuShow = false
      }
      this.$scope.$apply()
    })

    angular.element(this.$window).bind('scroll', () => {
      if (this.$window.pageYOffset >= this.styleConstant.NAVBAR_HEIGHT
        && this.$window.innerWidth >= this.styleConstant.DESKTOP_WINDOW_WIDTH) {
        this.isHelpMenuShow = false
      }
      this.$scope.$apply()
    })

  }

  public toggleHelpMenuShow = (): void => {
    this.isHelpMenuShow = !this.isHelpMenuShow
  }

}
