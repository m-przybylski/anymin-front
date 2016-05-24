(function() {
  function proCheckbox() {

    function linkFunction(scope, element, attr) {

      scope.isChecked = false

      scope.onClickCallback = () => {
        scope.isChecked = !scope.isChecked
        scope.ngModel = scope.isChecked
      }

      if ('id' in attr.$attr) {
        scope.id = attr.id
      } 
      
      if (typeof scope.value === 'undefined') {
        scope.value = true
      }

      if ('required' in attr.$attr) {
        scope.required = true
      }

    }

    return {
      templateUrl:  'directives/interface/pro-checkbox/pro-checkbox.tpl.html',
      restrict:     'E',
      replace:      true,
      link: linkFunction,
      scope: {
        ngModel: '=',
        label: '@',
        value: '=?',
        name: '@'
      }
    }
  }

  angular.module('profitelo.directives.interface.pro-checkbox', [])
  .directive('proCheckbox', proCheckbox)

}())