(function() {
  function proTagsSlider($window, $timeout) {
    function linkFunction(scope, element) {
    }


    return {
      templateUrl: 'directives/pro-tags-slider/pro-tags-slider.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        tags: '=?',
        onTagClickAction: '=?'

      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.pro-tags-slider', [])
    .directive('proTagsSlider', proTagsSlider)

}())
