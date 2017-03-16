(function() {
  function proAdviceTile() {


    return {
      template:  require('./pro-advice-tile.pug')(),
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
