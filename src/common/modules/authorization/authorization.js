angular.module('authorization', [

])


.factory('AuthorizationService', AuthorizationService);

function AuthorizationService(AccountRest){



  var _register = (object) =>{
    //TODO register instead of GET
    var AccountRest = new AccountRest(object);
    product.$save();

    AccountRest.get().$promise.then((data)=>{



    }, (error) =>{



    });
  };




  var api = {
    register: _register



  };
  return api;
}