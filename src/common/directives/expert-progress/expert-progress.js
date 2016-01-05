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
    number:       '1',
    title:        'EXPERT_PROGRESS.EXPERT.TITLE',
    description:  'EXPERT_PROGRESS.EXPERT.DESCRIPTION',
    uiTitle:      'EXPERT_PROGRESS.EXPERT.UISREF.TITLE',
    uiTitleDone:  'EXPERT_PROGRESS.EXPERT.UISREF.TITLE.DONE',
    uiSref:       'app.expert-profile',
    status:       100,
    verify:       false
  }
  vm.box.services = {
    number:       '2',
    title:        'EXPERT_PROGRESS.SERVICES.TITLE',
    description:  'EXPERT_PROGRESS.SERVICES.DESCRIPTION',
    uiTitle:      'EXPERT_PROGRESS.SERVICES.UISREF.TITLE',
    uiTitleDone:  'EXPERT_PROGRESS.SERVICES.UISREF.TITLE.DONE',
    uiSref:       'app.services',
    status:       100,
    verify:       false
  }


  vm.verifyBox = {
    number:       '3',
    title:        'EXPERT_PROGRESS.VERIFICATION.TITLE',
    description:  'EXPERT_PROGRESS.VERIFICATION.DESCRIPTION',
    uiTitleDone:  'EXPERT_PROGRESS.VERIFICATION.UISREF.TITLE',
    uiSref:       'app.somewhere',
    ableToSend:   true,
    sended:       false,
    verified:     false,
    accepted:     true
  }

  return vm

}
