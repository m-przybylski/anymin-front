(function() {

  /*@ngInject*/
  function controllerFunction($scope) {

    
    this.isHidden = false
    
    $scope.$on('toggleChat', () => {
      this.isHidden = !this.isHidden
    })

    this.isFullScreenMode = false
    
    this.toggleFullScreen = () => {
      this.isFullScreenMode = !this.isFullScreenMode  
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
    'profitelo.components.communicator.pro-text-chat',
    'profitelo.components.communicator.pro-video-chat'
  ])
    .component('proBottomCommunicator', proBottomCommunicator)

}())