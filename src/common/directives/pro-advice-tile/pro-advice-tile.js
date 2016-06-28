(function() {
  function proAdviceTile() {


    return {
      templateUrl:  'directives/pro-advice-tile/pro-advice-tile.tpl.html',
      restrict:     'E',
      replace: true,
      scope: {
        ngModel: '='
      }
    }
  }

  angular.module('profitelo.directives.pro-advice-tile', [])
  .directive('proAdviceTile', proAdviceTile)

}())
