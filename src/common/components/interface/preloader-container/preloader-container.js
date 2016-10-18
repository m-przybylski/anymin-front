(function() {
  /* @ngInject */
  function preloaderContainerController() {

    return this
  }

  const component = {
    bindings: {
      isLoading: '<',
      isError: '=?',
      errorFn: '=?',
      errorMessage: '@'
    },
    templateUrl: 'components/interface/preloader-container/preloader-container.tpl.html',
    controllerAs: '$ctrl',
    controller: preloaderContainerController
  }

  angular.module('profitelo.components.interface.preloader-container', [
    'pascalprecht.translate',
    'profitelo.components.interface.preloader'
  ])
    .component('preloaderContainer', component)
}())
