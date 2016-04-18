(function() {

  function loginStateService($state, $timeout) {

    let _account = {
      phoneNumber: {
        prefix: '+21',
        number: '345678765'
      },
      password: ''
    }

    return {
      setAccountObject: (account) => {
        _account = account
      },
      getAccountObject: () => {
        return angular.copy(_account)
      }
    }
  }

  angular.module('profitelo.services.login-state', [
    'ui.router'
  ])
  .service('loginStateService', loginStateService)

}())