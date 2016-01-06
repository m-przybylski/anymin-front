angular.module('profitelo.controller.expert-progress', [
  'ui.router'
])
.config(config)
.controller('ExpertProgressController', ExpertProgressController)




function AccountStatusApiResolver($q, SessionsApi, AccountsStatusApi) {
  var deferred = $q.defer()
  SessionsApi.get().$promise.then(function(response) {
    AccountsStatusApi.query({telcoLogin: response.telcoLogin}).$promise.then(function(result) {
      deferred.resolve(result)
    }, function(error) {
      deferred.reject(error)
    })
  }, function(error) {
    deferred.reject(error)
  })
  return deferred.promise
}



function config($stateProvider) {
  $stateProvider.state('app.expert-progress', {
    url: '/expert-progress',
    controllerAs: 'vm',
    controller: 'ExpertProgressController',
    templateUrl: 'expert-progress/expert-progress.tpl.html',
    resolve: {
      AccountSession: AccountStatusApiResolver
    }
  })
}

function ExpertProgressController(AccountSession) {

  var vm = this

  vm.accountSession = AccountSession

}
