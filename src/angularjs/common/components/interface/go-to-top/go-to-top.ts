// tslint:disable:no-null-keyword
// tslint:disable:no-invalid-this
import * as angular from 'angular';
import { SmoothScrollingService } from '../../../services/smooth-scrolling/smooth-scrolling.service';
import { IWindowService } from '../../../services/window/window.service';
import smoothScrollingModule from '../../../services/smooth-scrolling/smooth-scrolling';

function controller($window: IWindowService, $scope: ng.IScope, smoothScrollingService: SmoothScrollingService): void {

  this.flagController = {
    isShow: false,
    checkScrollWay: null
  };

  angular.element($window).bind('scroll', () => {
    ($window.pageYOffset > this.flagController.checkScrollWay) ?
      this.flagController.isShow = true : this.flagController.isShow = false;
    $scope.$digest();
    this.flagController.checkScrollWay = $window.pageYOffset;
  });

  this.goToTop = (): void => {
    smoothScrollingService.simpleScrollTo('body');
  };

  return this;
}

const goToTop = {
  template: require('./go-to-top.html'),
  controllerAs: '$ctrl',
  controller: ['$window', '$scope', 'smoothScrollingService', controller]
};

angular.module('profitelo.components.interface.go-to-top', [
  smoothScrollingModule
])
  .component('goToTop', goToTop);
