function proInputPassword() {

  function linkFunction() {

  }

  return {
    templateUrl:  'directives/interface/pro-input-password/pro-input-password.tpl.html',
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


angular.module('profitelo.directives.interface.pro-input-password', [])
.directive('proInputPassword', proInputPassword)
