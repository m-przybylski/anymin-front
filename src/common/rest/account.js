angular.module('profitelo.rest.account', [
  'ngResource'
])
.factory('AccountRest', AccountRest);

function AccountRest($resource) {
  return $resource('/registration/:id', {id: '@_id'}, {
    update: {method: 'PUT'}
  });
}