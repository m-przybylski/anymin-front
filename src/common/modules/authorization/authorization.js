angular.module('authorization', [

])

.factory('AuthorizationService', AuthorizationService);

function AuthorizationService(SessionsRestService, RegistrationRestService, $cookies) {

  var _register = (object) => {
    // object should contain username, password, organization name

    RegistrationRestService.save(object).$promise.then((success) =>{
      $cookies.put("sessionKey", success);
    }, (error) =>{
      console.log(error);
    });
  };
  var _login = (object) => {
    SessionsRestService.save(object).$promise.then((success) =>{
      $cookies.put("sessionKey", success);
    }, (error) =>{
      console.log(error);
    });



    // after logging set cookie with sessionKey
  };

  var api = {
    register: _register,
    login:    _login
  };
  return api;
}
