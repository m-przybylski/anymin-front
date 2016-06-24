(function() {
  function proExpertSlider() {
    function linkFunction(scope) {

      var controlsClick = 0

      scope.prevSlide = () => {
        if(controlsClick > 0) {
          let width = $('.slides').width() + 32
          $('.slider-slides').animate({'left': '+='+width+'px'}, 'slow')
          controlsClick = controlsClick - 1
        }
      }

      scope.nextSlide = () => {
        let width = $('.slides').width() + 32
        let containerWidth = $('.slider-control').width() + 32
        let countVisableItem = Math.round(containerWidth/width)
        let itemCount = $('.slides').length
        let currentSlides = itemCount - countVisableItem
        if (controlsClick < currentSlides) {
          $('.slider-slides').animate({'left': '-='+width+'px'}, 'slow')
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
