// tslint:disable:no-require-imports
// tslint:disable:no-invalid-this
import * as angular from 'angular';
import { IWindowService } from '../../../services/window/window.service';
import { StateService } from '@uirouter/angularjs';

function controller($window: IWindowService, $scope: ng.IScope, $state: StateService): void {
  this.isHidden = false;
  let checkScrollWay = 0;

  const onClose = (): void => {
    if (angular.isFunction(this.onClose)) {
      this.onClose();
    } else {
      $state.go('app.dashboard.client.favourites');
    }
  };

  this.onCloseClick = (): void => {
    onClose();
  };

  angular.element($window).bind('scroll', () => {
    this.isHidden = ($window.pageYOffset > checkScrollWay);

    $scope.$apply();
    checkScrollWay = $window.pageYOffset;
  });

  return this;
}

const component = {
  template: require('./top-modal-navbar.html'),
  controller: ['$window', '$scope', '$state', controller],
  bindings: {
    onClose: '<'
  }
};

angular.module('profitelo.components.interface.top-modal-navbar', [])
  .component('topModalNavbar', component);
