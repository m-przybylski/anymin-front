(function() {

  let proTextChat = {
    transclude: true,
    templateUrl:    'components/pro-text-chat/pro-text-chat.tpl.html'
  }

  angular.module('profitelo.components.pro-text-chat', [
    'pascalprecht.translate'

  ])
  .component('proTextChat', proTextChat)

}())