(function() {

  let proVideoChat = {
    transclude: true,
    templateUrl:    'components/communicator/pro-video-chat/pro-video-chat.tpl.html',
    bindings: {
      chatAction: '='
    },
    controller: ['$scope', '$timeout', function($scope, $timeout) {
      /* istanbul ignore next */
      $scope.chatSwitcher = () =>{
        this.chatAction()
      }
    }]
  }

  angular.module('profitelo.components.communicator.pro-video-chat', [
    'pascalprecht.translate',
    'profitelo.components.communicator.pro-video-chat.pro-video-chat-top-navbar',
    'profitelo.components.communicator.pro-video-chat.pro-video-player',
    'profitelo.components.communicator.pro-video-chat.pro-video-preview',
    'profitelo.components.communicator.pro-video-chat.pro-video-controls'
  ])
  .component('proVideoChat', proVideoChat)

}())
