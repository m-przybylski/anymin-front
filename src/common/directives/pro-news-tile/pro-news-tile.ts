(function() {
  function proNewsTile() {


    return {
      templateUrl:  'directives/pro-news-tile/pro-news-tile.tpl.html',
      restrict:     'E',
      replace: true,
      scope: {
        ngModel: '='
      }
    }
  }

  angular.module('profitelo.directives.pro-news-tile', [])
  .directive('proNewsTile', proNewsTile)

}())
