(function() {

  let proBottomCommunicator = {
    transclude: true,
    templateUrl:    'components/communicator/pro-bottom-communicator/pro-bottom-communicator.tpl.html'
  }

  angular.module('profitelo.components.communicator.pro-bottom-communicator', [
    'pascalprecht.translate'
  ])
    .component('proBottomCommunicator', proBottomCommunicator)

}())