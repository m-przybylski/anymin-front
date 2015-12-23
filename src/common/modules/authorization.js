angular.module('authorization', [

])

.factory('AuthorizationService', AuthorizationService);

function AuthorizationService(AccountRest) {

  var _register = () => {
    // TODO register instead of GET
    AccountRest.get().$promise.then((data) => {
      console.log('data', data)
    }, (error) =>{
      console.log('Error', error)
    });
  };

  var api = {
    register: _register
  };
  return api;
}
