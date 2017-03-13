(function() {
  function passwordStrengthBar() {

    function linkFunction(scope: any, _element: ng.IRootElementService, _attr: ng.IAttributes) {
      scope.classes = [
        'start',
        'very-weak',
        'weak',
        'strong',
        'very-strong'
      ]
      scope.currentClass = 0

      scope.$watch(()=> {
        return scope.currentClass
      }, (newValue: number, _oldValue: number)=>{

        scope.currentClass = Math.floor(scope.currentClass)

        if (newValue > 4) {
          scope.currentClass = 4
        }
        if (newValue < 0) {
          scope.currentClass = 0
        }
      })

    }
    return {
      template: require('./password-strength-bar.jade')(),
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        currentClass: '=?'
      }
    }
  }

  angular.module('profitelo.directives.password-strength-bar', [])
  .directive('passwordStrengthBar', passwordStrengthBar)

}())
