angular.module('profitelo.controller.expert-profile', [
  'ui.router',
  'profitelo.api.accounts',
  'profitelo.api.sessions'
])
.config(config)
.controller('ExpertProfileController', ExpertProfileController);

function AccountsApiResolver($q, SessionsApi, AccountsApi) {
  var deferred = $q.defer();
  SessionsApi.get().$promise.then(function(response) {
    AccountsApi.query({telcoLogin: response.telcoLogin}).$promise.then(function(result) {
      deferred.resolve(result);
    }, function(error) {
      deferred.reject(error);
    })
  }, function(error) {
    deferred.reject(error);
  });
  return deferred.promise
}

function config($stateProvider) {
  $stateProvider.state('app.expert-profile', {
    url: '/expert-profile',
    templateUrl: 'expert-profile/expert-profile.tpl.html',
    controller: 'ExpertProfileController',
    controllerAs: 'vm',
    resolve: {
      Account: AccountsApiResolver
    }
  });
}

function ExpertProfileController(Account) {

  var vm = this;

  vm.account = Account;

}
