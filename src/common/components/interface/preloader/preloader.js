(function() {

  let preloader = {
    transclude: true,
    bindings: {
      waitForResponse: '=?'
    },
    templateUrl: 'components/interface/preloader/preloader.tpl.html',
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.interface.preloader', [
    'pascalprecht.translate'
  ])
    .component('preloader', preloader)
}())
