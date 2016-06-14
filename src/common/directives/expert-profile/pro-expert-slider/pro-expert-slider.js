(function() {
  function proExpertSlider() {

    return {
      templateUrl: 'directives/expert-profile/pro-expert-slider/pro-expert-slider.tpl.html',
      restrict: 'E',
      replace: true
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-slider', [])
  .directive('proExpertSlider', proExpertSlider)

}())
