import * as angular from 'angular';
import { INavbarLoggedOutMenuComponentBindings } from './navbar-logged-out-menu';
import { Config } from '../../../../../config';

// tslint:disable:member-ordering
export class NavbarLoggedOutMenuComponentController implements INavbarLoggedOutMenuComponentBindings {

  public isHelpMenuShow = false;

  public static $inject = ['$document', '$element', '$scope', '$window'];

    constructor(private $document: ng.IDocumentService, private $element: ng.IRootElementService,
              private $scope: ng.IScope, private $window: ng.IWindowService) {

    this.$document.bind('click', (event: Event) => {

      const ifTargetClicked = this.$element.find(event.target).length > 0;
      if (!ifTargetClicked) {
        this.isHelpMenuShow = false;
      }
      this.$scope.$apply();
    });

    angular.element(this.$window).bind('scroll', () => {
      if (this.$window.pageYOffset >= Config.styles.NAVBAR_HEIGHT
        && this.$window.innerWidth >= Config.styles.DESKTOP_WINDOW_WIDTH) {
        this.isHelpMenuShow = false;
      }
      this.$scope.$apply();
    });

  }

  public toggleHelpMenuShow = (): void => {
    this.isHelpMenuShow = !this.isHelpMenuShow;
  }

}
