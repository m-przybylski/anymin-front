angular.module('profitelo.controller.registration', [
  'ui.router'
])
.config(config)

.controller('RegistrationController', RegistrationController)

function StepResolver($q, $stateParams) {
  var deferred = $q.defer()
  if ($stateParams.token==='') {
    deferred.resolve(true)

  } else {
    deferred.resolve(false)
  }
  return deferred.promise
}


function RegistrationController(Step1) {
  var vm = this
  vm.step1 = Step1
  return vm
}

function config($stateProvider) {
  $stateProvider.state('app.registration', {
    url: '/registration/:token',
    controllerAs: 'vm',
    controller: 'RegistrationController',
    templateUrl: 'registration/registration.tpl.html',
    resolve: {
      Step1: StepResolver
    }
  })
}