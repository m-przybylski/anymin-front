import * as angular from 'angular'
import {UrlService} from '../../../services/url/url.service'
import urlModule from '../../../services/url/url'

/* @ngInject */
function controller($scope: any, urlService: UrlService): void {
  const minExpertsCount: number = 5
  this.areControllsVisible = false
  this.expertsArray = []
  this.expertsArray = this.expertsArray.concat(this.experts)

  if (this.expertsArray.length >= minExpertsCount) {
    this.areControllsVisible = true
  }

  this.controlls = {}

  this.nextSlide = (): void => {
    $scope.controlls.nextSlide()
  }

  this.prevSlide = (): void => {
    $scope.controlls.prevSlide()
  }

  this.expertImage = (token: string): string => {
    if (!!token && token !== null) {
      return urlService.resolveFileUrl(token)
    }
    return ''
  }

  return this
}

const expertsConsultationSlider = {
  template: require('./experts-consultation-slider.pug')(),
  bindings: {
    experts: '<',
    title: '@'
  },
  controller,
  controllerAs: '$ctrl'
}

angular.module('profitelo.components.expert-profile.experts-consultation-slider', [
  'profitelo.components.interface.slider',
  urlModule,
  'pascalprecht.translate'
])
  .component('expertsConsultationSlider', expertsConsultationSlider)
