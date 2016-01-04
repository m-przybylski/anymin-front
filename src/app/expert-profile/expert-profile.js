angular.module('profitelo.controller.expert-profile', [
  'ui.router',
  'profitelo.services.rest.accounts',
  'profitelo.services.rest.sessions'
])
.config(config)
.controller('ExpertProfileController', ExpertProfileController);

function AccountsRestServiceResolver($q, SessionsRestService, AccountsRestService) {
  var deferred = $q.defer();
  SessionsRestService.get().$promise.then(function(response) {
    AccountsRestService.query({telcoLogin: response.telcoLogin}).$promise.then(function(result) {
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
      Account: AccountsRestServiceResolver
    }
  });
}

function ExpertProfileController(Account) {

  var vm = this;

  vm.account = Account;

}
