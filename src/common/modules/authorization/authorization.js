angular.module('authorization', [

])

.factory('AuthorizationService', AuthorizationService)

function AuthorizationService(SessionsApi, RegistrationApi, $cookies) {

  var _register = (object) => {
    // object should contain username, password, organization name

    RegistrationApi.save(object).$promise.then((success) =>{
      $cookies.put('sessionKey', success)
    }, (error) =>{
      console.log(error)
    })
  }
  var _login = (object) => {
    SessionsApi.save(object).$promise.then((success) =>{
      $cookies.put('sessionKey', success)
    }, (error) =>{
      console.log(error)
    })



    // after logging set cookie with sessionKey
  }

  var api = {
    register: _register,
    login:    _login
  }
  return api
}
