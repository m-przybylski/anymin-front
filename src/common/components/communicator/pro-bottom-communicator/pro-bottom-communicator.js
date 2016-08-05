(function() {

  /* @ngInject */
  function controllerFunction($scope, $log, proRatelService, currentCallSessionService) {

    proRatelService.authenticate()

    this.isVisible = false
    this.showChat = false
    this.isFullScreenMode = false
    this.session = null
    let _wasChatShown = false
    
    this.messages = []

    let _toggleChat = () => {

      if (this.isVisible) {
        _wasChatShown = this.showChat
        this.showChat = false
      } else {
        this.showChat = _wasChatShown
      }

      this.isVisible = !this.isVisible

    }


    proRatelService.onDirectRoom(session => {
      this.session = session
      currentCallSessionService.setSession(session)
      this.isVisible = true
    })

    proRatelService.onRoomHistory(history => {
      this.messages = history
    })

    proRatelService.onHangup(() => {
      this.isVisible = false
      this.showChat = false
    })

    
    $scope.$on('toggleChat', _toggleChat)
    

    this.toggleFullScreen = () => {
      this.isFullScreenMode = !this.isFullScreenMode
    }

    this.toggles = {
      communicator: () => {
        this.isVisible = !this.isVisible
      },
      chat: () => {
        this.showChat = !this.showChat
      }
    }

    return this

  }


  let proBottomCommunicator = {
    transclude: true,
    replace: true,
    templateUrl:    'components/communicator/pro-bottom-communicator/pro-bottom-communicator.tpl.html',
    controllerAs: 'vm',
    controller: controllerFunction
  }

  angular.module('profitelo.components.communicator.pro-bottom-communicator', [
    'pascalprecht.translate',
    'profitelo.components.communicator.pro-video-chat.pro-video-chat-top-navbar',
    'profitelo.components.communicator.pro-text-chat',
    'profitelo.components.communicator.pro-video-chat',
    'profitelo.services.pro-ratel-service',
    'profitelo.services.current-call-state'
  ])
    .component('proBottomCommunicator', proBottomCommunicator)

}())
