(function() {
  function passwordStrengthBar() {

    function linkFunction(scope, element, attr) {
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
      }, (newValue, oldValue)=>{

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
      templateUrl: 'directives/password-strength-bar/password-strength-bar.tpl.html',
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