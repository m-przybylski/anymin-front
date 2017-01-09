(function() {

  function proMasonry($timeout, $log) {

    function linkFunction(scope, element, attr) {

      if (angular.isUndefined(attr.gridItem)) {
        $log.error('gridItem attribute has to be given in order for the directive to initialize')
      }

      $timeout(() => {
        element.masonry({
          itemSelector: attr.gridItem
        })
      })

    }

    return {
      restrict: 'A',
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.pro-masonry', [])
  .directive('proMasonry', proMasonry)
}())
