(function() {

  let proVideochatTopNavbar = {
    transclude: true,
    templateUrl:    'components/communicator/pro-videochat/pro-videochat-top-navbar/pro-videochat-top-navbar.tpl.html'
  }

  angular.module('profitelo.components.communicator.pro-videochat.pro-videochat-top-navbar', [
    'pascalprecht.translate'

  ])
  .component('proVideochatTopNavbar', proVideochatTopNavbar)

}())
