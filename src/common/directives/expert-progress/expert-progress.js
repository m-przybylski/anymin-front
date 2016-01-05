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

.controller('ExpertProgressDirectiveController', ExpertProgressDirectiveController)

function ExpertProgressDirectiveController() {
  var vm = this
  vm.box = {}
  vm.box.expert = {
    number: '1',
    title:'EXPERT_PROGRESS.EXPERT.TITLE',
    description:'EXPERT_PROGRESS.EXPERT.DESCRIPTION',
    uiTitle:'EXPERT_PROGRESS.EXPERT.UISREF.TITLE',
    uiSref:'app.expert-profile',
    // probably number
    status:0
  }
  vm.box.services = {
    number: '2',
    title:'EXPERT_PROGRESS.SERVICES.TITLE',
    description:'EXPERT_PROGRESS.SERVICES.DESCRIPTION',
    uiTitle:'EXPERT_PROGRESS.SERVICES.UISREF.TITLE',
    uiSref:'app.services',
    status: 100
  }
  vm.box.verification = {
    number: '3',
    title: 'EXPERT_PROGRESS.VERIFICATION.TITLE',
    description: 'EXPERT_PROGRESS.VERIFICATION.DESCRIPTION',
    uiTitle: 'EXPERT_PROGRESS.VERIFICATION.UISREF.TITLE',
    uiSref:'app.somewhere',
    status: 0
  }
  return vm

}
