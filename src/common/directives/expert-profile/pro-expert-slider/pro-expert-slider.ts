import * as angular from 'angular'
import {DialogService} from '../../../services/dialog/dialog.service'
import dialogModule from '../../../services/dialog/dialog'
import 'common/components/interface/slider/slider'
import 'common/controllers/lightbox-modal/lightbox-modal'
import 'common/components/pro-lightbox/pro-lightbox'
import {IDirective} from 'angular'

function proExpertSlider(dialogService: DialogService, $timeout: ng.ITimeoutService): IDirective {

  function linkFunction(scope: any): void {

    scope.areControllsVisible = true

    $timeout(() => {
      if (scope.sliders.length <= 3) {
        scope.areControllsVisible = false
      }
    })

    scope.imageUrl = (slide: any): string => {
      return slide.previews[0]
    }

    scope.controlls = {}

    scope.nextSlide = function (): void {
      scope.controlls.nextSlide()
    }

    scope.prevSlide = function (): void {
      scope.controlls.prevSlide()
    }

    scope.openDialog = (slide: any): void => {
      scope.fullSizeUrl = slide.previews[0]
      scope.slide = slide
      dialogService.openDialog({
        scope: scope,
        template: '<pro-lightbox current-slide="$ctrl.currentSlide" actions-settings="$ctrl.navSettings" slider-actions="$ctrl.sliderActions" slides-list="$ctrl.slideList"></pro-lightbox>',
        controllerAs: '$ctrl',
        controller: 'lightboxModelController',
        windowTemplateUrl: require('../../../controllers/lightbox-modal/lightbox-modal.tpl.pug')
      })
    }
  }

  return {
    template: require('./pro-expert-slider.pug')(),
    restrict: 'E',
    replace: true,
    scope: {
      sliders: '=?'
    },
    link: linkFunction
  }
}

angular.module('profitelo.directives.expert-profile.pro-expert-slider', [
  dialogModule,
  'profitelo.components.interface.slider',
  'profitelo.common.controller.lightbox-model',
  'profitelo.components.pro-lightbox'
])
  .directive('proExpertSlider', proExpertSlider)
