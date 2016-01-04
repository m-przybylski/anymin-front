angular.module('profitelo.directive.proProgressBox', [
])

.directive('proExpertProgress', () =>{
  return {
    templateUrl:  'directives/pro-progress-box/pro-progress-box.tpl.html',
    restrict:     'A',
    controller:   'ProProgressBox',
    controllerAs: 'vm',
    replace:      true
  }
})

.controller('ExpertProgressDirectiveController', ExpertProgressDirectiveController);

function ExpertProgressDirectiveController() {
  var vm = this;

  return vm;

}
