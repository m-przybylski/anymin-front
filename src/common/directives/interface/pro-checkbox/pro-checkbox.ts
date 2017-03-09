(function () {
  function proCheckbox() {

    function linkFunction(scope: any, element: ng.IRootElementService, attr: any) {

      if (typeof scope.ngModel !== 'boolean') {
        throw new Error('ngModel must be of boolean type')
      }

      scope.changeCheckedState = (state: string) => {
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

      /* istanbul ignore else */
      if ('required' in attr.$attr) {
        scope.required = true
      }

    }

    return {
      template: require('./pro-checkbox.jade')(),
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

  angular.module('profitelo.directives.interface.pro-checkbox', [])
    .directive('proCheckbox', proCheckbox)

}())
