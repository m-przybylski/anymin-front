(function() {
  function proFooter() {

    return {
      templateUrl: 'directives/pro-footer/pro-footer.tpl.html',
      restrict: 'E',
      replace: true
    }
  }

  angular.module('profitelo.directives.pro-footer', [
    'pascalprecht.translate'
  ])
  .directive('proFooter', proFooter)

}())
