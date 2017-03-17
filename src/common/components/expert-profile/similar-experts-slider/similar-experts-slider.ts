import * as angular from 'angular'
import {UrlService} from '../../../services/url/url.service'
import urlModule from '../../../services/url/url'

/* @ngInject */
function controller($scope: any, $state: ng.ui.IStateService, urlService: UrlService) {

  this.$onInit = () => {
    this.areControllsVisible = this.consultations.length > 3
  }

  this.nextSlide = () => {
    $scope.controlls.nextSlide()
  }

  this.prevSlide = () => {
    $scope.controlls.prevSlide()
  }

  this.consultationOwnerImage = (imgToken: string) => {
    return imgToken !== null || imgToken === '' ? urlService.resolveFileUrl(imgToken) : false
  }

  this.goToProfile = (consultation: any) => {
    const stateName = consultation.owner.type === 'ORG' ? 'app.company-profile' : 'app.expert-profile'
    $state.go(stateName, {profileId: consultation.owner.id, primaryConsultationId: consultation.id})
  }

  return this
}

const similarExpertsSlider = {
  template: require('./similar-experts-slider.pug')(),
  bindings: {
    consultations: '<',
    title: '@'
  },
  controller: controller,
  controllerAs: '$ctrl'
}

angular.module('profitelo.components.expert-profile.similar-experts-slider', [
  'profitelo.components.interface.slider',
  urlModule,
  'pascalprecht.translate'
])
  .component('similarExpertsSlider', similarExpertsSlider)
