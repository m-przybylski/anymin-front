(function() {

  function proMasonry($timeout) {

    function linkFunction(scope, element, attr) {

      if (angular.isUndefined(attr.gridItem)) {
        throw new Error('gridItem attribute has to be given in order for the directive to initialize')
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
