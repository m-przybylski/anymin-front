(function() {
  function proExpertSlider() {
    function linkFunction(scope) {

      var controlsClick = 0
      var slideWidth = 0

      scope.leftOffset = {left: 0}

      scope.prevSlide = () => {
        if (controlsClick > 0) {
          let width = $('.slides').width() + 32
          slideWidth = slideWidth + width
          scope.leftOffset = {left: slideWidth}
          controlsClick = controlsClick - 1
        }
      }

      scope.nextSlide = () => {
        let width = $('.slides').width() + 32
        let containerWidth = $('.slider-slides').width() + 32
        let countVisableItem = Math.floor(containerWidth/width)
        let itemCount = $('.slides').length
        let currentSlides = itemCount - countVisableItem
        if (controlsClick < currentSlides) {
          slideWidth = slideWidth - width
          scope.leftOffset = {left: slideWidth}
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
