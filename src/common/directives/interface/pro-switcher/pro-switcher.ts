(function() {
  function proSwitcher() {

    function linkFunction(scope, element, attr) {

      if (typeof scope.ngModel !== 'boolean') {
        throw new Error('ngModel must be of boolean type')
      }

      scope.changeCheckedState = (state) => {
        element.find('input').prop('checked', state)
      }

      scope.onClickCallback = () => {
        scope.ngModel = !scope.ngModel
        scope.changeCheckedState(scope.ngModel)

      }

      scope.changeCheckedState(scope.ngModel)

      /* istanbul ignore else */
      if ('id' in attr.$attr) {
        scope.id = attr.id
      }
    }

    return {
      templateUrl: 'directives/interface/pro-switcher/pro-switcher.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        ngModel: '=',
        label: '@',
        name: '@'
      }
    }

  }

  angular.module('profitelo.directives.interface.pro-switcher', [])
    .directive('proSwitcher', proSwitcher)

}())