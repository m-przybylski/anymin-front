(function() {
  function autofocus($timeout) {
    function linkFunction(scope, element, attr) {
      $timeout(function() {
        $(element).find('input').focus()
      })
    }
    return {
      restrict: 'A',
      link: linkFunction
    }
  }

  angular.module('autofocus', [])
  .directive('autofocus', autofocus)
}())
