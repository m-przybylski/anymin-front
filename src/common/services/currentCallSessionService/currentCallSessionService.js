/* istanbul ignore next */
(function() {
  function currentCallSessionService($rootScope) {

    let session = null

    return {
      setSession: newSession => {
        $rootScope.callSession = true
        session = newSession
        return session
      },
      getSession: () => {
        return session
      },
      removeSession: () => {
        session = null
        $rootScope.callSession = false
        return session
      }
    }

  }

  
  angular.module('profitelo.services.current-call-state', [
    'pascalprecht.translate',
    'c7s.ng.userAuth',
    'profitelo.swaggerResources'
  ])
    .service('currentCallSessionService', currentCallSessionService)

}())
