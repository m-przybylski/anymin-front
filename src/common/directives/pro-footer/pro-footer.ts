(function() {
  function proFooter() {

    return {
      template: require('./pro-footer.jade')(),
      restrict: 'E',
      replace: true
    }
  }

  angular.module('profitelo.directives.pro-footer', [
    'pascalprecht.translate'
  ])
  .directive('proFooter', proFooter)

}())
