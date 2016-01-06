angular.module('profitelo.directive.expertProgress', [
])

.directive('proExpertProgress', () =>{
  return {
    templateUrl:  'directives/expertProgress/expertProgress.tpl.html',
    restrict:     'A',
    controller:   'ExpertProgressDirectiveController',
    controllerAs: 'vm',
    scope:        {container:'='},
    replace:      true
  }
})

.controller('ExpertProgressDirectiveController', ExpertProgressDirectiveController)

function _validateStatus(obj) {
  if (isNaN(obj.profileProgressPercentage)) {
    obj.profileProgressPercentage = 0
  }
  if (isNaN(obj.profileProgressPercentage)) {
    obj.serviceProgressPercentage = 0
  }

}
function _prepareVerifyBox(container, vm) {
  var _displayDefault = false, _rejected = false, _inProgress = false, _accepted = false, _ableToSend = false
  if (container.profileProgressPercentage === 100 && container.serviceProgressPercentage === 100) {
    _ableToSend = true
  }
  switch (container.verification.status) {
  case 'IN_PROGRESS':
    _inProgress = true
    break
  case 'ACCEPTED':
    _accepted = true
    break
  case 'REJECTED':
    _rejected = true
    break
  default:
    _displayDefault = true
  }
  vm.verifyBox = {
    number:           '3',
    title:            'EXPERT_PROGRESS.VERIFICATION.TITLE',
    description:      'EXPERT_PROGRESS.VERIFICATION.DESCRIPTION',
    uiTitleDone:      'EXPERT_PROGRESS.VERIFICATION.UISREF.TITLE',
    uiSref:           'app.somewhere',
    feedback:         vm.container.verification.details,
    ableToSend:       _ableToSend,
    displayDefault:   _displayDefault,
    rejected:         _rejected,
    accepted:         _accepted,
    inProgress:       _inProgress
  }

}
function ExpertProgressDirectiveController($scope) {
  var vm = this
  _validateStatus($scope.container)
  console.log($scope.container)
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

  _prepareVerifyBox(vm.container, vm)

  return vm

}
