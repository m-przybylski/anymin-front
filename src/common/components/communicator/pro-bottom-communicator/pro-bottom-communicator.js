/* istanbul ignore next */
(function() {

  /* @ngInject */
  function controllerFunction($scope, proRatelService, currentCallSessionService) {

    proRatelService.authenticate()

    this.isVisible = false
    this.showChat = false
    this.isFullScreenMode = false
    this.session = null
    let _wasChatShown = false

    this.callStatus = {
      time: {
        s: 0,
        m: 0
      },
      cost: 0
    }

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

    proRatelService.onStartedCall(event => {
      console.log('call had been started')
      proRatelService.startTimer(status => {
        this.callStatus.time.s = parseInt(status.time % 60, 10)
        this.callStatus.time.m = parseInt(status.time / 60, 10)

        if (this.callStatus.time.m < 10) {
          this.callStatus.time.m = '0' + this.callStatus.time.m
        }

        if (this.callStatus.time.s < 10) {
          this.callStatus.time.s = '0' + this.callStatus.time.s
        }

        this.callStatus.cost = parseFloat(status.cost / 100).toFixed(2)
      })
    })

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
      proRatelService.stopTimer()
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
