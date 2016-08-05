(function() {
  function proExpertSlider(DialogService, CommonConfig) {
    function linkFunction(scope) {
      let _commonConfig = CommonConfig.getAllData()

      scope.imageUrl = (slide) => {
        return _commonConfig.urls.backend + _commonConfig.urls['file-download'].replace('%s', slide)
      }


      scope.controlls = {}


      scope.nextSlide = function() {
        scope.controlls.nextSlide()
      }

      scope.prevSlide = function() {
        scope.controlls.prevSlide()
      }

      scope.openDialog = (slide) => {
        scope.fullSizeUrl = _commonConfig.urls.backend + _commonConfig.urls['file-download'].replace('%s', slide)
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
    'commonConfig'
  ])
  .directive('proExpertSlider', proExpertSlider)

}())
