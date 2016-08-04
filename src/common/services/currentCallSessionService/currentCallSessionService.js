(function() {
  function currentCallSessionService() {

    let session = null

    return {
      setSession: newSession => {
        session = newSession
        return session
      },
      getSession: () => {
        return session
      },
      removeSession: () => {
        session = null
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
