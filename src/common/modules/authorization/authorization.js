angular.module('profitelo.modules.authorization', [
  'ngCookies',
  'hellojs'
])

.factory('AuthorizationService', AuthorizationService)

function AuthorizationService($q, $cookies, $http, SessionApi, RegistrationApi) {

  var
    _setApiKeyHeader,
    _checkToken,
    _register,
    _login,
    _loginSocial

  _setApiKeyHeader = (apiKey) => {
    $cookies.put('X-Api-Key', apiKey)
    $http.defaults.headers.common['X-Api-Key'] = apiKey
  }

  _checkToken = (object) => {
    var deferred = $q.defer()
    RegistrationApi.checkToken(object).$promise.then((success)=>{
      _setApiKeyHeader(success.apiKey)
      deferred.resolve(success)
    }, (error) => {
      deferred.reject(error)
    })
    return deferred.promise
  }

  _register = (object) => {
    var deferred = $q.defer()
    RegistrationApi.save(object).$promise.then((success) =>{
      deferred.resolve(success)
    }, (error) =>{
      deferred.reject(error)
    })
    return deferred.promise
  }

  _login = (object) => {
    var deferred = $q.defer()
    SessionApi.save(object).$promise.then((success) =>{
      _setApiKeyHeader(success.apiKey)
      deferred.resolve(success)
    }, (error) =>{
      deferred.reject(error)
    })
    return deferred.promise
  }

  _loginSocial = function(socialNetworkName, successCallback, errorCallback) {
    if (typeof successCallback === 'undefined') {
      successCallback = function() {
        return null
      }
    }
    if (typeof errorCallback === 'undefined') {
      errorCallback = function() {
        return null
      }
    }
    HellojsService.login(socialNetworkName).then(function(data) {
      var dataStripped
      console.log('HellojsService.login(socialNetworkName) recerived data:', data)
      dataStripped = {
        network: socialNetworkName,
        token: data.access_token
      }
      return Restangular.one('session').all('social').post(dataStripped).then(function(response) {


        _me(response)
      }, function(error) {

        errorCallback(error)
      })
    }, function(e) {
      GlobalNotificationsService.add({
        msg: e.data.error,
        type: 'danger'
      })
      console.log('HellojsService.login(socialNetworkName) received error:', e)
    })
  }


  var api = {
    register:         _register,
    login:            _login,
    checkToken:       _checkToken,
    setApiKeyHeader:  _setApiKeyHeader,
    loginSocial:      _loginSocial
  }
  return api
}
