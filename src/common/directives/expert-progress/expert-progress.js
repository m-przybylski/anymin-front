angular.module('profitelo.directive.expert-progress', [
])

.directive('proExpertProgress', () =>{
  return {
    templateUrl:  'directives/expert-progress/expert-progress.tpl.html',
    restrict:     'A',
    controller:   'ExpertProgressDirectiveController',
    controllerAs: 'vm',
    replace:      true
  }
})

.controller('ExpertProgressDirectiveController', ExpertProgressDirectiveController);

function ExpertProgressDirectiveController() {
  var vm = this;

  return vm;

}
