angular.module('authorization', [

])

.factory('AuthorizationService', AuthorizationService)

function AuthorizationService($q, $cookies, $http, SessionsApi, RegistrationApi) {

  var _setApiKeyHeader = (apiKey) => {
    $cookies.put('X-Api-Key', apiKey)
    $http.defaults.headers.common['X-Api-Key'] = apiKey
  }

  var _checkToken = (object) => {
    // object should contain token field
    var deferred = $q.defer()
    RegistrationApi.checkToken(object).$promise.then((success)=>{
      _setApiKeyHeader(success.apiKey)
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


  var _loginSocial

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
    return HellojsService.login(socialNetworkName).then(function(data) {
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
    loginSocial: _loginSocial
  }
  return api
}
