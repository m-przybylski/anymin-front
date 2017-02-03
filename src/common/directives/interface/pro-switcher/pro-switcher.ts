(function() {
  function proSwitcher() {

    function linkFunction(scope, element, attr) {

      if (typeof scope.ngModel !== 'boolean') {
        throw new Error('ngModel must be of boolean type')
      }

      const changeCheckedState = (state) => {
        element.find('input').prop('checked', state)
      }

      scope.onClickCallback = () => {
        scope.ngModel = !scope.ngModel
        changeCheckedState(scope.ngModel)
        if (angular.isFunction(scope.callback)) {
          scope.callback(scope.ngModel)
        }
      }
      changeCheckedState(scope.ngModel)
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
        callback: '=?',
        label: '@',
        name: '@'
      }
    }

  }

  angular.module('profitelo.directives.interface.pro-switcher', [])
    .directive('proSwitcher', proSwitcher)

}())
