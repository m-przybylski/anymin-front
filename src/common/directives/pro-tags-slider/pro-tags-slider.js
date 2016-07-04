(function() {
  function proTagsSlider($window) {
    function linkFunction(scope, element, attr) {
      let sliderContainer = $('.slides-container')
      let currentWidth = 0
      let widthOfAll = $('.slide-page').width()
      let currentSlidePage = 1

      angular.element($window).on('resize', ()=> {
        currentWidth = $('.slider-tag').width()
        currentSlidePage = 1
        sliderContainer.animate({'left':  '0px'}, 'fast')
      })

      scope.prevSlide = () => {
        if (parseInt(sliderContainer.css('left'), 10) !== 0 && !(sliderContainer.is(':animated'))) {
          currentSlidePage--
          currentWidth = $('.slider-tag').width()
          sliderContainer.animate({'left': '+=' + currentWidth + 'px'}, 'slow')
        }
      }

      scope.nextSlide = () => {
        if (currentSlidePage >= Math.round(widthOfAll/currentWidth) ) {
          currentSlidePage = 1
          sliderContainer.animate({'left':  '0px'}, 'slow')
        } else {
          currentSlidePage++
          currentWidth = $('.slider-tag').width()
          sliderContainer.animate({'left': '-=' + currentWidth + 'px'}, 'slow')
        }
      }
    }


    return {
      templateUrl: 'directives/pro-tags-slider/pro-tags-slider.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.pro-tags-slider', [])
    .directive('proTagsSlider', proTagsSlider)

}())
