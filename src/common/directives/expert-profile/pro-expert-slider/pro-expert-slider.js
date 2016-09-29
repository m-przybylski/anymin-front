(function() {
  function proExpertSlider(DialogService, HelperService) {
    function linkFunction(scope) {

      scope.imageUrl = (slide) => {
        return slide.previews[0]
      }

      scope.controlls = {}

      scope.nextSlide = function() {
        scope.controlls.nextSlide()
      }

      scope.prevSlide = function() {
        scope.controlls.prevSlide()
      }

      scope.openDialog = (slide) => {
        scope.fullSizeUrl = slide.previews[0]
        scope.slide = slide
        DialogService.openDialog({
          scope: scope,
          controller: 'galleryModelController',
          templateUrl: 'controllers/gallery-modal/gallery-modal.tpl.html'
        })
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

  angular.module('profitelo.directives.expert-profile.pro-expert-slider', [
    'profitelo.services.dialog-service',
    'profitelo.components.interface.slider',
    'profitelo.common.controller.gallery-modal',
    'profitelo.services.helper-service'
  ])
  .directive('proExpertSlider', proExpertSlider)

}())
