function _validateStatus(obj) {
  if (isNaN(parseInt(obj.profileProgressPercentage, 10))) {
    obj.profileProgressPercentage = 0
  }
  if (isNaN(parseInt(obj.serviceProgressPercentage, 10))) {
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
  vm.container = $scope.container
  vm.box = {}
  vm.box.expert = {
    number:       '1',
    title:        'EXPERT_PROGRESS.EXPERT.TITLE',
    description:  'EXPERT_PROGRESS.EXPERT.DESCRIPTION',
    uiTitle:      'EXPERT_PROGRESS.EXPERT.UISREF.TITLE',
    uiTitleDone:  'EXPERT_PROGRESS.EXPERT.UISREF.TITLE.DONE',
    uiSref:       'app.expert-profile',
    class:        'icon-talk-man',
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
    class:        'icon-gears',
    status:       vm.container.serviceProgressPercentage,
    verify:       false
  }

  _prepareVerifyBox(vm.container, vm)

  return vm

}

angular.module('profitelo.directives.pro-expert-progress', [
  'ui.router',
  'pascalprecht.translate'
])

.directive('proExpertProgress', () =>{
  return {
    templateUrl:  'directives/pro-expert-progress/pro-expert-progress.tpl.html',
    restrict:     'A',
    controller:   ExpertProgressDirectiveController,
    controllerAs: 'vm',
    scope:        {container:'='},
    replace:      true
  }
})



