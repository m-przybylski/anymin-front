function LoginDirectiveController($state, AuthorizationService, toastr) {
  var vm = this

  vm.login = () =>
    AuthorizationService.login(vm.userData).then(()=>{
      $state.go('app.dashboard.start')
    }, (error) =>{
      toastr.error('Wrong credentials', 'Something went wrong!')
    })

  return vm

}

angular.module('profitelo.directives.pro-login', [
  'ui.router',
  'ngCookies',
  'authorization',
  'toastr',
  'profitelo.api.sessions',
  'profitelo.api.registration',
  'pascalprecht.translate'
])

.directive('proLogin', () =>{
  return {
    templateUrl:  'directives/pro-login/pro-login.tpl.html',
    restrict:     'A',
    controller:   LoginDirectiveController,
    controllerAs: 'vm',
    replace:      true
  }
})



