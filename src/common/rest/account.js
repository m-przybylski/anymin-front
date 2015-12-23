angular.module('profitelo.rest.account', [
  'ngResource'
])
.factory('AccountRest', AccountRest);

function AccountRest($resource) {
  return $resource('api/account/:id', {id: '@_id'}, {
    update: {method: 'PUT'}
  });
}