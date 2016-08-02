(function() {
  function proExpertSlider(DialogService) {
    function linkFunction(scope) {
      scope.controlls = {}
      scope.nextSlide = function() {
        scope.controlls.nextSlide()
      }
      scope.prevSlide = function() {
        scope.controlls.prevSlide()
      }
      scope.openDialog = (slide) => {
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
    'profitelo.common.controller.gallery-modal'
  ])
  .directive('proExpertSlider', proExpertSlider)

}())
