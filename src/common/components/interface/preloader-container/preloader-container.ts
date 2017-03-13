import * as angular from "angular"
import "common/components/interface/preloader/preloader"

/* @ngInject */
function preloaderContainerController() {

  this.errorFunction = () => {
    this.errorFn()
  }

  return this
}

const component = {
  bindings: {
    isLoading: '<',
    isError: '=?',
    errorFn: '=?',
    errorMessage: '@'
  },
  template: require('./preloader-container.jade')(),
  transclude: true,
  controllerAs: '$ctrl',
  controller: preloaderContainerController
}

angular.module('profitelo.components.interface.preloader-container', [
  'pascalprecht.translate',
  'profitelo.components.interface.preloader'
])
  .component('preloaderContainer', component)
