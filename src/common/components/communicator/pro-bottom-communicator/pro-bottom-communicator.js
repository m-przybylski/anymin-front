(function() {

  /* @ngInject */
  function controllerFunction($scope, proRatelService) {
    
    proRatelService.authenticate()

    this.isVisible = false
    this.showChat = false

    let _wasChatShown = false
    
    let _toggleChat = () => {

      if (this.isVisible) {
        _wasChatShown = this.showChat
        this.showChat = false
      } else {
        this.showChat = _wasChatShown
      }

      this.isVisible = !this.isVisible
      
    }
    
    $scope.$on('toggleChat', _toggleChat)

    this.isFullScreenMode = false

    this.toggleFullScreen = () => {
      this.isFullScreenMode = !this.isFullScreenMode
    }

    this.toggles = {
      communicatorState: (isVisible) => {
        this.isVisible = isVisible
      },
      communicator: () => {
        this.isVisible = !this.isVisible
      },
      chatState: (showChat) => {
        this.showChat = showChat
      },
      chat: () => {
        this.showChat = !this.showChat
      },
      endCall: () => {
        _toggleChat()
      }
    }

    return this

  }


  let proBottomCommunicator = {
    transclude: true,
    replace: true,
    templateUrl:    'components/communicator/pro-bottom-communicator/pro-bottom-communicator.tpl.html',
    controllerAs: 'proBottomCommunicatorController',
    controller: controllerFunction
  }

  angular.module('profitelo.components.communicator.pro-bottom-communicator', [
    'pascalprecht.translate',
    'profitelo.components.communicator.pro-video-chat.pro-video-chat-top-navbar',
    'profitelo.components.communicator.pro-text-chat',
    'profitelo.components.communicator.pro-video-chat',
    'profitelo.services.pro-ratel-service'
  ])
    .component('proBottomCommunicator', proBottomCommunicator)

}())
