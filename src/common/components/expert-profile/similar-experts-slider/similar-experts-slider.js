(function() {

  /* @ngInject */
  function controller($scope) {

    this.imageUrl = (slide) => {
      return slide.previews[0]
    }

    this.controlls = {}

    this.nextSlide = function() {
      $scope.controlls.nextSlide()
    }

    this.prevSlide = function() {
      $scope.controlls.prevSlide()
    }

    this.consultations = [{name: 'asas'}, {name: 'adsasd'}, {name: 'adasd'}, {name: 'asas'}]
    return this
  }

  const similarExpertsSlider = {
    templateUrl: 'components/expert-profile/similar-experts-slider/similar-experts-slider.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      consultations: '<'
    },
    controller: controller,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.expert-profile.similar-experts-slider', [
    'profitelo.components.interface.slider'
  ])
    .component('similarExpertsSlider', similarExpertsSlider)

}())
