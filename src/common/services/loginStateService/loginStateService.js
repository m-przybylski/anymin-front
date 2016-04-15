(function() {

  function loginStateService() {

    let _account = {
      phoneNumber: {
        prefix: null,
        number: null
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