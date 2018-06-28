// tslint:disable:no-mixed-interface
// tslint:disable:readonly-array
// tslint:disable:prefer-method-signature
// tslint:disable:only-arrow-functions
// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
import * as angular from 'angular';
import { DialogService } from '../../../services/dialog/dialog.service';
import dialogModule from '../../../services/dialog/dialog';
import 'angularjs/common/components/interface/slider/slider';
import 'angularjs/common/controllers/lightbox-modal/lightbox-modal';
import 'angularjs/common/components/pro-lightbox/pro-lightbox';
import { IDirective } from 'angular';

interface IControlls {
  nextSlide: () => void;
  prevSlide: () => void;
}

export interface IProExpertSlideScope extends ng.IScope {
  controlls: IControlls;
  sliders: {}[];
  prevSlide: () => void;
  nextSlide: () => void;
  openDialog: (slide: any) => void;
  areControllsVisible: boolean;
  imageUrl: (slide: any) => string;
  fullSizeUrl: string;
  slide: any;
}

function proExpertSlider(dialogService: DialogService, $timeout: ng.ITimeoutService): IDirective<ng.IScope> {

  function linkFunction(scope: IProExpertSlideScope): void {

    scope.areControllsVisible = true;
    const maxSlidersWithoutConstrollers = 3;

    $timeout(() => {
      if (scope.sliders.length <= maxSlidersWithoutConstrollers) {
        scope.areControllsVisible = false;
      }
    });

    scope.imageUrl = (slide: any): string => slide.previews[0];

    scope.nextSlide = function (): void {
      scope.controlls.nextSlide();
    };

    scope.prevSlide = function (): void {
      scope.controlls.prevSlide();
    };

    scope.openDialog = (slide: any): void => {
      scope.fullSizeUrl = slide.previews[0];
      scope.slide = slide;
      dialogService.openDialog({
        scope,
        template: '<pro-lightbox current-slide="$ctrl.currentSlide" actions-settings="$ctrl.navSettings" ' +
                  'slider-actions="$ctrl.sliderActions" slides-list="$ctrl.slideList"></pro-lightbox>',
        controllerAs: '$ctrl',
        controller: 'lightboxModelController',
        windowTemplateUrl: require('../../../controllers/lightbox-modal/lightbox-modal.tpl.html')
      });
    };
  }

  return {
    template: require('./pro-expert-slider.html'),
    restrict: 'E',
    replace: true,
    scope: {
      sliders: '=?'
    },
    link: linkFunction
  };
}

angular.module('profitelo.directives.expert-profile.pro-expert-slider', [
  dialogModule,
  'profitelo.components.interface.slider',
  'profitelo.common.controller.lightbox-model',
  'profitelo.components.pro-lightbox'
])
  .directive(
    'proExpertSlider', ['dialogService', '$timeout', proExpertSlider]);
