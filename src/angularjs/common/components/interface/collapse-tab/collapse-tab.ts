// tslint:disable:prefer-conditional-expression
// tslint:disable:no-require-imports
// tslint:disable:no-null-keyword
// tslint:disable:no-invalid-this
// tslint:disable:newline-before-return
import * as angular from 'angular';
import { SmoothScrollingService } from '../../../services/smooth-scrolling/smooth-scrolling.service';
import { IWindowService } from '../../../services/window/window.service';
import smoothScrollingModule from '../../../services/smooth-scrolling/smooth-scrolling';

function controller($element: ng.IRootElementService,
                    smoothScrollingService: SmoothScrollingService,
                    $window: IWindowService,
                    $log: ng.ILogService,
                    $scope: ng.IScope,
                    $timeout: ng.ITimeoutService): void {
  this.stylesObject = {
    height: null
  };

  this.isCollapsed = false;

  const getFirstCollapseElementHeight = (): number => {
    const firstCollapseElement = $element.find('ng-transclude > div:first-child');
    if (firstCollapseElement) {
      return firstCollapseElement.height();
    } else {
      $log.error('In method getFirstCollapseElementHeight: element div:first-child not found');
      return 0;
    }
  };

  const getCollapseWrapperHeight = (): number => $element.find('.collapse-content').height();

    const onWindowResize = (): void => {
    if (this.isCollapsed) {
      this.stylesObject.height = getCollapseWrapperHeight();
    } else {
      this.stylesObject.height = getFirstCollapseElementHeight();
    }
    $scope.$digest();
  };

  $timeout(() => {
    this.stylesObject.height = getFirstCollapseElementHeight();
  });

    angular.element($window).on('resize', onWindowResize);

  this.toggleCollapse = (): void => {
    const scrollAnimationTime = 1000;
    this.stylesObject.height = this.stylesObject.height !== getCollapseWrapperHeight() ?
      getCollapseWrapperHeight() : getFirstCollapseElementHeight();

    this.isCollapsed = !this.isCollapsed;
    if (this.stylesObject.height !== getCollapseWrapperHeight()) {
      smoothScrollingService.simpleScrollTo('#collapseWrap', true, scrollAnimationTime);
    }
  };

  this.checkedHeight = (): boolean => getFirstCollapseElementHeight() === getCollapseWrapperHeight();

  return this;
}

const collapseTab = {
  template: require('./collapse-tab.html'),
  controllerAs: '$ctrl',
  transclude: true,
  controller: ['$element', 'smoothScrollingService', '$window', '$log', '$scope', '$timeout', controller]
};

angular.module('profitelo.components.interface.collapse-tab', [
  smoothScrollingModule
])
  .component('collapseTab', collapseTab);
