function proProgressBox() {
  var vm = this
  return vm

}

angular.module('profitelo.directives.pro-registration-input-pass', [])
.directive('proRegistrationInputPass', ($interval) =>{
  function linkFn(scope, element) {
    console.log(scope.isPassword)
    scope.isPassword = Boolean(scope.isPassword)
    var _input = element.find('input')
    _input.bind("focus", () => {
      element.addClass('selected')
    })
    _input.bind("blur", () => {
      element.removeClass('selected')
    })
    $interval(() => {
      console.log(scope.isPassword)
    }, 1000)
  }
  return {
    templateUrl:  'directives/pro-registration-input-pass/pro-registration-input-pass.tpl.html',
    restrict:     'A',
    scope:        { name:       '@',
                    labelIcon:  '@',
                    isDupa: '@',
                    inputValue: '='
                  },
    link:         linkFn
  }
})


