(function() {

  function loginStateService() {

    let _account = {
      phoneNumber: {
        prefix: '+00',
        number: '000000000'
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

  angular.module('profitelo.services.login-state', [])
  .service('loginStateService', loginStateService)

}())