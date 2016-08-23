(function() {

  let proVideoChatTopNavbar = {
    transclude: true,
    templateUrl:    'components/communicator/pro-video-chat/pro-video-chat-top-navbar/pro-video-chat-top-navbar.tpl.html',
    bindings: {
      toggles: '='
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.communicator.pro-video-chat.pro-video-chat-top-navbar', [
    'pascalprecht.translate'

  ])
  .component('proVideoChatTopNavbar', proVideoChatTopNavbar)

}())
