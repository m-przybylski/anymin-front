(function() {

  let proModals = {
    transclude: true,
    templateUrl: 'components/communicator/modals/modals.tpl.html'
  }

  angular.module('profitelo.components.communicator.modals', [
    'pascalprecht.translate'
  ])
  .component('proModals', proModals)

}())
