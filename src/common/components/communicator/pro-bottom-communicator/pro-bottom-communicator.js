(function() {

  function controllerFunction($scope) {

    
    this.showChat = false
    
    $scope.$on('toggleChat', () => {
      this.showChat = !this.showChat
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
    controller: ['$scope', controllerFunction]
  }

  angular.module('profitelo.components.communicator.pro-bottom-communicator', [
    'pascalprecht.translate'
  ])
    .component('proBottomCommunicator', proBottomCommunicator)

}())