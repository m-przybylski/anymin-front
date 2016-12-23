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
    templateUrl: 'components/interface/preloader/preloader.tpl.html',
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.preloader', [
    'pascalprecht.translate'
  ])
    .component('preloader', component)
}())
