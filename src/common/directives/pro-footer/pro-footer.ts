(function() {
  function proFooter() {

    return {
      template: require('./pro-footer.pug')(),
      restrict: 'E',
      replace: true
    }
  }

  angular.module('profitelo.directives.pro-footer', [
    'pascalprecht.translate'
  ])
  .directive('proFooter', proFooter)

}())
