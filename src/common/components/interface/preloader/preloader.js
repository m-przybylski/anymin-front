(function() {
  /* @ngInject */
  function controller($scope, $timeout) {
    this.isLoadingTimeouted = false

    let isTimeout = false
    let tmp = false

    const defaultMinimalTimeout = 1000

    const _set = (v) => {

      tmp = !!v

      if (!this.isLoadingTimeouted && v) {
        this.isLoadingTimeouted = true
        isTimeout = true
        $timeout(() => {
          isTimeout = false
          if (!tmp) {
            this.isLoadingTimeouted = false
          }
        }, angular.isDefined(this.minTimeout) ? this.minTimeout : defaultMinimalTimeout)
      }

      if (this.isLoadingTimeouted && v === false) {
        if (!isTimeout) {
          this.isLoadingTimeouted = false
        }
      }
    }

    $scope.$watch(() => {
      return this.isLoading
    }, (newVal, oldVal) => {
      if (!angular.equals(newVal, oldVal)) {
        _set(newVal)
      }
    })
  }

  let preloader = {
    transclude: true,
    bindings: {
      isLoading: '<'
    },
    templateUrl: 'components/interface/preloader/preloader.tpl.html',
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.preloader', [
    'pascalprecht.translate'
  ])
    .component('preloader', preloader)
}())
