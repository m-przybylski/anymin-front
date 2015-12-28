angular.module('authorization', [

])

.factory('AuthorizationService', AuthorizationService);

function AuthorizationService(AccountRest) {

  var _register = (object) => {
    var accountRest = new AccountRest(object);
    accountRest.$save();
  };

  AccountRest.get().$promise.then((data)=>{
    console.log(data);
  });

  var api = {
    register: _register
  };
  return api;
}
