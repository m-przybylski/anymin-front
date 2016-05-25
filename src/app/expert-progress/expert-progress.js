angular.module('profitelo.controller.expert-progress', [
  'ui.router',
  'c7s.ng.userAuth'
])
.config(config)
.controller('ExpertProgressController', ExpertProgressController)

/* istanbul ignore next */
function AccountStatusApiResolver($q, AccountsStatusApi, UserService) {
  var deferred = $q.defer()
  // TODO should be changed to BITMASK from profitelo
  let _data = UserService.getAllData()
  AccountsStatusApi.query({id: _data.id}).$promise.then((result) => {
    deferred.resolve(result)
  }, (error) => {
    deferred.resolve(false)
  })

  return deferred.promise
}

function config($stateProvider, UserRolesProvider) {
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
