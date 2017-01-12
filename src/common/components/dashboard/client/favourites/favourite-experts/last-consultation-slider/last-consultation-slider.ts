(function () {
  /* @ngInject */
  function controller($scope, $state, HelperService) {

    this.$onInit = () => {
      this.areControllsVisible = this.consultations.length > 3
    }

    this.nextSlide = () => {
      $scope.controlls.nextSlide()
    }

    this.prevSlide = () => {
      $scope.controlls.prevSlide()
    }

    this.consultationOwnerImage = (imgToken) => {
      return imgToken !== null || imgToken === '' ? HelperService.fileUrlResolver(imgToken) : false
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
    'profitelo.services.helper',
    'profitelo.filters.money',
    'pascalprecht.translate'
  ])
  .component('lastConsultationSlider', lastConsultationSlider)

}())
