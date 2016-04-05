function proInput() {

  function linkFunction() {

  }

  return {
    templateUrl:  'directives/interface/pro-input/pro-input.tpl.html',
    restrict:     'E',
    replace:      true,
    link: linkFunction,
    scope: {
      proModel: '=',
      placeholder: '@',
      defaultValue: '@',
      label: '@'
    }

  }

}


angular.module('profitelo.directives.interface.pro-input', [])
.directive('proInput', proInput)
