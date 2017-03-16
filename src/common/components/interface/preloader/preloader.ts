(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    transclude: true,
    bindings: {
      isLoading: '=?'
    },
    template: require("./preloader.pug")(),
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.preloader', [
    'pascalprecht.translate'
  ])
    .component('preloader', component)
}())
