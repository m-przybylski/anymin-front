(function() {

  let proVideoChat = {
    transclude: true,
    templateUrl:    'components/pro-videochat/pro-videochat.tpl.html'
  }

  angular.module('profitelo.components.pro-videochat', [
    'pascalprecht.translate'
  ])
  .component('proVideoChat', proVideoChat)

}())