(function() {
  function proExpertSlider(dialogService, $timeout) {
    function linkFunction(scope) {

      scope.areControllsVisible = true

      $timeout(() => {
        if (scope.sliders.length <= 3) {
          scope.areControllsVisible = false
        }
      })

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
        dialogService.openDialog({
          scope: scope,
          template: '<pro-lightbox current-slide="$ctrl.currentSlide" actions-settings="$ctrl.navSettings" slider-actions="$ctrl.sliderActions" slides-list="$ctrl.slideList"></pro-lightbox>',
          controllerAs: '$ctrl',
          controller: 'lightboxModelController',
          windowTemplateUrl: 'controllers/lightbox-modal/lightbox-modal.tpl.html'
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
    'profitelo.services.dialog',
    'profitelo.components.interface.slider',
    'profitelo.common.controller.lightbox-model',
    'profitelo.components.pro-lightbox'
  ])
  .directive('proExpertSlider', proExpertSlider)

}())
