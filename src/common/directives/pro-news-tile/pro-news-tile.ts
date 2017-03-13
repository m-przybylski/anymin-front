(function() {
  function proNewsTile() {


    return {
      template:  require('./pro-news-tile.jade')(),
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
