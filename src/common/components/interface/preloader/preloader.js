(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  let preloader = {
    transclude: true,
    bindings: {
      isLoading: '=?'
    },
    templateUrl: 'components/interface/preloader/preloader.tpl.html',
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.preloader', [
    'pascalprecht.translate'
  ])
    .component('preloader', preloader)
}())
