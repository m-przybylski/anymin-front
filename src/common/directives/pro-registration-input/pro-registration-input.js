function proProgressBox() {
  var vm = this
  return vm

}

angular.module('profitelo.directives.pro-registration-input', [])
.directive('proRegistrationInput', () =>{
  function link(scope, element) {
    console.log(scope.icon)
    var _input = element.find('input')
    _input.bind("focus", () =>{
      element.addClass('selected')
    })
    _input.bind("blur", () =>{
      element.removeClass('selected')
    })
  }
  return {
    templateUrl:  'directives/pro-registration-input/pro-registration-input.tpl.html',
    restrict:     'A',
    scope:        { icon: '='},
    controller:   proProgressBox,
    controllerAs: 'vm',
    replace:      true,
    link:         link
  }
})


