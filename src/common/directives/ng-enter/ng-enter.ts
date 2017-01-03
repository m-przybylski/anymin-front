(function() {

  function ngEnter() {

    function linkFunction(scope, elem, attrs) {
      elem.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter)
          })
          event.preventDefault()
        }
      })
    }

    return {
      link: linkFunction
    }
  }


  angular.module('profitelo.directives.ng-enter', [
  ])
  .directive('ngEnter', ngEnter)
}())


