(function() {

  function SetNewPasswordController($state, $stateParams, validateToken) {

    console.log(validateToken)
    
    
  }

  function config($stateProvider) {
    $stateProvider.state('app.login.set-new-password', {
      url: '/set-new-password/:method/:token',
      controllerAs: 'vm',
      controller: 'SetNewPasswordController',
      templateUrl: 'login/set-new-password/set-new-password.tpl.html',
      resolve: {
        validateToken: ($stateParams, $state) => {
          if ($stateParams.method.length === '' || $stateParams.method.length === '') {
            $state.go('app.login.account')
            // TODO: state delay alert
          } else {
            // TODO api call to check if code is correct
            return {
              userId: 21312390432
            }
          }
        }
      }
    })
  }


  angular.module('profitelo.controller.login.set-new-password', [
    'ui.router',
    'profitelo.services.login-state'
  ])
  .config(config)
  .controller('SetNewPasswordController', SetNewPasswordController)

}())