(function() {
  function proExpertSlider() {
    function linkFunction(scope) {

      var controlsClick = 0

      scope.prevSlide = () => {
        if (controlsClick > 0) {
          let width = $('.slider-slides').width()
          width = width/3
          $('.slider-slides').animate({'left': '+=295px'}, 'slow')
          controlsClick = controlsClick - 1
        }
      }

      scope.nextSlide = () => {
        let itemCount = $('.slides').length
        let currentSlides = itemCount-3

        if (currentSlides > controlsClick) {
          let width = $('.slider-slides').width()
          width = width/3
          $('.slider-slides').animate({'left': '-=295px'}, 'slow')
          controlsClick = controlsClick + 1
        }
      }
    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-slider/pro-expert-slider.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        sliders: '=?'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-slider', [])
  .directive('proExpertSlider', proExpertSlider)

}())
