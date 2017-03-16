import * as angular from "angular"
import {UrlService} from "../../../services/url/url.service"
import urlModule from "../../../services/url/url"

/* @ngInject */
function controller($scope: any, urlService: UrlService) {
  this.areControllsVisible = false

  this.expertsArray = []
  this.expertsArray = this.expertsArray.concat(this.experts)

  if (this.expertsArray.length > 4) {
    this.areControllsVisible = true
  }

  this.controlls = {}

  this.nextSlide = () => {
    $scope.controlls.nextSlide()
  }

  this.prevSlide = () => {
    $scope.controlls.prevSlide()
  }

  this.expertImage = (token: string) => {
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
  controller: controller,
  controllerAs: '$ctrl'
}


angular.module('profitelo.components.expert-profile.experts-consultation-slider', [
  'profitelo.components.interface.slider',
  urlModule,
  'pascalprecht.translate'
])
  .component('expertsConsultationSlider', expertsConsultationSlider)
