// tslint:disable:no-implicit-dependencies
import * as angular from 'angular';
import 'angularjs/common/components/interface/preloader/preloader';

function preloaderContainerController(): void {

  this.errorFunction = (): void => {
    this.errorFn();
  };

  return this;
}

const component = {
  bindings: {
    isLoading: '<',
    isError: '=?',
    errorFn: '=?',
    errorMessage: '@'
  },
  template: require('./preloader-container.html'),
  transclude: true,
  controllerAs: '$ctrl',
  controller: [preloaderContainerController]
};

angular.module('profitelo.components.interface.preloader-container', [
  'pascalprecht.translate',
  'profitelo.components.interface.preloader'
])
  .component('preloaderContainer', component);
