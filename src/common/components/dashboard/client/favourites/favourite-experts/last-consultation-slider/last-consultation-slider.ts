import * as angular from 'angular'
import {UrlService} from '../../../../../../services/url/url.service'

  /* @ngInject */
  function controller($scope: any, $state: ng.ui.IStateService, urlService: UrlService): void {

    this.$onInit = (): void => {}

    this.nextSlide = (): void => {
      $scope.controlls.nextSlide()
    }

    this.prevSlide = (): void => {
      $scope.controlls.prevSlide()
    }

    this.consultationOwnerImage = (imgToken: string): string | boolean => {
      return imgToken !== null || imgToken === '' ? urlService.resolveFileUrl(imgToken) : false
    }

    this.goToProfile = (consultation: any): void => {
      $state.go('app.expert-profile', {
        profileId: consultation.profile.id,
        primaryConsultationId: consultation.service.id
      })
    }

    return this
  }

  const lastConsultationSlider = {
    template: require('./last-consultation-slider.pug')(),
    restrict: 'E',
    replace: true,
    bindings: {
      consultations: '<',
      title: '@'
    },
    controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.favourites.favourite-experts.last-consultation-slider', [
    'profitelo.components.interface.slider',
    'profitelo.services.url',
    'profitelo.filters.money',
    'pascalprecht.translate',
    'ui.router'

  ])
  .component('lastConsultationSlider', lastConsultationSlider)
