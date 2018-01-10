import * as angular from 'angular'
import {UrlService} from '../../../services/url/url.service'
import urlModule from '../../../services/url/url'
import {StateService} from '@uirouter/angularjs'

function controller($scope: any, $state: StateService, urlService: UrlService): void {

  this.$onInit = (): void => {
    const minConsultationsLength: number = 4
    this.areControllsVisible = this.consultations.length >= minConsultationsLength
  }

  this.nextSlide = (): void => {
    $scope.controlls.nextSlide()
  }

  this.prevSlide = (): void => {
    $scope.controlls.prevSlide()
  }

  this.consultationOwnerImage = (imgToken: string): string | boolean =>
    imgToken !== null || imgToken === '' ? urlService.resolveFileUrl(imgToken) : false

  this.goToProfile = (consultation: any): void => {
    const stateName = consultation.owner.type === 'ORG' ? 'app.company-profile' : 'app.expert-profile'
    $state.go(stateName, {profileId: consultation.owner.id, primaryConsultationId: consultation.id})
  }

  return this
}

const similarExpertsSlider = {
  template: require('./similar-experts-slider.html'),
  bindings: {
    consultations: '<',
    title: '@'
  },
  controller: ['$scope', '$state', 'urlService', controller],
  controllerAs: '$ctrl'
}

angular.module('profitelo.components.expert-profile.similar-experts-slider', [
  'profitelo.components.interface.slider',
  urlModule,
  'pascalprecht.translate'
])
  .component('similarExpertsSlider', similarExpertsSlider)
