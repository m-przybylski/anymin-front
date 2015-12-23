angular.module('profitelo.rest.account', [
  'ngResource'
])
.factory('AccountRest', AccountFactory);

function AccountFactory($resource) {
  return $resource('api/account/:id', {id: '@_id'}, {
    update: {method: 'PUT'}
  });
}
