angular.module('authorization', [

])


.factory('AuthorizationService', AuthorizationService);

function AuthorizationService(AccountRest){



  var _register = () =>{
    //TODO register instead of GET
    AccountRest.get().$promise.then((data)=>{



    }, (error) =>{



    });
  };




  var api = {
    register: _register



  };
  return api;
}