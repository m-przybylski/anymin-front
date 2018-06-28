// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
import * as angular from 'angular';
import { UrlService } from '../../../../../../services/url/url.service';
import { StateService } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

// tslint:disable:strict-type-predicates
function controller($scope: any, $state: StateService, urlService: UrlService): void {

  this.$onInit = (): void => {
  };

  this.nextSlide = (): void => {
    $scope.controlls.nextSlide();
  };

  this.prevSlide = (): void => {
    $scope.controlls.prevSlide();
  };

  this.consultationOwnerImage = (imgToken: string): string | boolean =>
    imgToken !== null || imgToken === '' ? urlService.resolveFileUrl(imgToken) : false;

  this.goToProfile = (consultation: any): void => {
    $state.go('app.expert-profile', {
      profileId: consultation.profile.id,
      primaryConsultationId: consultation.service.id
    });
  };

  return this;
}

const lastConsultationSlider = {
  template: require('./last-consultation-slider.html'),
  restrict: 'E',
  replace: true,
  bindings: {
    consultations: '<',
    title: '@'
  },
  controller: ['$scope', '$state', 'urlService', controller],
  controllerAs: '$ctrl'
};

angular.module('profitelo.components.dashboard.client.favourites.favourite-experts.last-consultation-slider', [
  uiRouter,
  'profitelo.components.interface.slider',
  'profitelo.services.url',
  'profitelo.filters.money',
  'pascalprecht.translate'
])
  .component('lastConsultationSlider', lastConsultationSlider);
