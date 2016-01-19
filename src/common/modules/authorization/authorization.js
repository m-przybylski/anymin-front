angular.module('authorization', [

])

.factory('AuthorizationService', AuthorizationService)

function AuthorizationService($q, $cookies, $http, SessionsApi, RegistrationApi) {

  var _checkToken = (object) => {
    // object should contain token field
    var deferred = $q.defer()
    RegistrationApi.checkToken(object).$promise.then((success)=>{
      deferred.resolve(success)
    }, (error) => {
      console.log(error)
      deferred.reject(error)
    })
    return deferred.promise
  }

  var _register = (object) => {
    // object should contain username, password, organization name
    var deferred = $q.defer()
    RegistrationApi.save(object).$promise.then((success) =>{
      deferred.resolve(success)
    }, (error) =>{
      console.log(error)
      deferred.reject(error)
    })
    return deferred.promise
  }

  var _login = (object) => {
    SessionsApi.save(object).$promise.then((success) =>{
    }, (error) =>{
      console.log(error)
    })

    // after logging set cookie with sessionKey
  }

  var _setApiKeyHeader = (apiKey) => {
    $http.defaults.headers.common['X-ApiKey'] = apiKey
  }

  var api = {
    register:         _register,
    login:            _login,
    checkToken:       _checkToken,
    setApiKeyHeader:  _setApiKeyHeader
  }
  return api
}
