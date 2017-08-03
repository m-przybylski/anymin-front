(function(): void {
  /* @ngInject */
  function controller(): void {

    return this
  }

  const component = {
    transclude: true,
    bindings: {
      isLoading: '=?'
    },
    template: require('./preloader.pug')(),
    controllerAs: '$ctrl',
    controller
  }

  angular.module('profitelo.components.interface.preloader', [
    'pascalprecht.translate'
  ])
    .component('preloader', component)
}())
