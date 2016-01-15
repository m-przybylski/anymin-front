function proProgressBox() {
  var vm = this
  return vm

}

angular.module('profitelo.directives.pro-progress-box', [])
.directive('proProgressBox', () =>{
  function link(scope, element) {
    if (scope.container.status === 100) {
      element.addClass('full-progress')
    }

  }
  return {
    templateUrl:  'directives/pro-progress-box/pro-progress-box.tpl.html',
    restrict:     'A',
    scope:        { container: '='},
    controller:   proProgressBox,
    controllerAs: 'vm',
    replace:      true,
    link:         link
  }
})


