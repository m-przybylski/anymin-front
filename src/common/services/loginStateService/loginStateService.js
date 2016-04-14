(function () {

  function loginStateService() {

    let _account = {}

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