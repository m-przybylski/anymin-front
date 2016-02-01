function LoginDirectiveController(AuthorizationService) {
  var vm = this

  vm.login = () =>
    AuthorizationService.login(vm.userData)

  return vm

}

angular.module('profitelo.directives.pro-login', [
  'ui.router',
  'ngCookies',
  'authorization',
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



