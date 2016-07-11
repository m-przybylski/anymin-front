(function($inject) {

  let proVideoChat = {
    transclude: true,
    templateUrl:    'components/pro-videochat/pro-videochat.tpl.html',
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

  angular.module('profitelo.components.pro-videochat', [
    'pascalprecht.translate'
  ])
  .component('proVideoChat', proVideoChat)

}())
