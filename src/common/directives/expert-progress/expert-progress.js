angular.module('profitelo.directive.expert-progress', [
])

.directive('proExpertProgress', () =>{
  return {
    templateUrl:  'directives/expert-progress/expert-progress.tpl.html',
    restrict:     'A',
    controller:   'ExpertProgressDirectiveController',
    controllerAs: 'vm',
    scope:        {container:'='},
    replace:      true
  }
})

.controller('ExpertProgressDirectiveController', ExpertProgressDirectiveController)

function _validateStatus(obj) {
  if (!isNaN(obj.profileProgressPercentage)) {
    obj.profileProgressPercentage = 0
  }
  if (!isNaN(obj.profileProgressPercentage)) {
    obj.serviceProgressPercentage = 0
  }
}
function _prepareVerifyBox(container, box) {
  if (container.profileProgressPercentage === container.serviceProgressPercentage === 100) {
    console.log(box)
  }

}
function ExpertProgressDirectiveController($scope) {
  var vm = this
  _validateStatus($scope.container)
  vm.container = $scope.container
  vm.box = {}
  vm.box.expert = {
    number:       '1',
    title:        'EXPERT_PROGRESS.EXPERT.TITLE',
    description:  'EXPERT_PROGRESS.EXPERT.DESCRIPTION',
    uiTitle:      'EXPERT_PROGRESS.EXPERT.UISREF.TITLE',
    uiTitleDone:  'EXPERT_PROGRESS.EXPERT.UISREF.TITLE.DONE',
    uiSref:       'app.expert-profile',
    status:       vm.container.profileProgressPercentage,
    verify:       false
  }
  vm.box.services = {
    number:       '2',
    title:        'EXPERT_PROGRESS.SERVICES.TITLE',
    description:  'EXPERT_PROGRESS.SERVICES.DESCRIPTION',
    uiTitle:      'EXPERT_PROGRESS.SERVICES.UISREF.TITLE',
    uiTitleDone:  'EXPERT_PROGRESS.SERVICES.UISREF.TITLE.DONE',
    uiSref:       'app.services',
    status:       vm.container.serviceProgressPercentage,
    verify:       false
  }

  // "verification": {
  //  "status": "IN_PROGRESS|ACCEPTED|REJECTED",
  //    "details": [
  //    "Nieodpowiednie zdjęcie profilowe",
  //    "Ubogi opis"
  //  ]
  // }
  vm.verifyBox = {
    number:       '3',
    title:        'EXPERT_PROGRESS.VERIFICATION.TITLE',
    description:  'EXPERT_PROGRESS.VERIFICATION.DESCRIPTION',
    uiTitleDone:  'EXPERT_PROGRESS.VERIFICATION.UISREF.TITLE',
    uiSref:       'app.somewhere',
    feedback:     container.verification.status.details,
    ableToSend:   true,
    sended:       false,
    verified:     false,
    accepted:     true
  }
  _prepareVerifyBox(vm.container, vm.verifyBox)

  return vm

}
