(function () {
  /* @ngInject */
  function controller($scope, $state, urlService) {

    this.$onInit = () => {}

    this.nextSlide = () => {
      $scope.controlls.nextSlide()
    }

    this.prevSlide = () => {
      $scope.controlls.prevSlide()
    }

    this.consultationOwnerImage = (imgToken) => {
      return imgToken !== null || imgToken === '' ? urlService.resolveFileUrl(imgToken) : false
    }

    this.goToProfile = (consultation) => {
      $state.go('app.expert-profile', {
        profileId: consultation.profile.id,
        primaryConsultationId: consultation.service.id
      })
    }

    return this
  }

  const lastConsultationSlider = {
    templateUrl: 'components/dashboard/client/favourites/favourite-experts/last-consultation-slider/last-consultation-slider.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      consultations: '<',
      title: '@'
    },
    controller: controller,
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

}())
