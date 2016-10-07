(function() {
  /* @ngInject */
  function preloaderContainerController($timeout, $scope) {

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
      if (!angular.equals(newVal, oldVal))
        _set(newVal)
    })

    this.errorFunction = () => {
      this.errorFn()
    }

    return this
  }

  const component = {
    bindings: {
      isLoading: '<',
      isError: '<',
      errorFn: '=?',
      errorMessage: '@'
    },
    templateUrl: 'components/interface/preloader-container/preloader-container.tpl.html',
    controllerAs: '$ctrl',
    controller: preloaderContainerController
  }

  angular.module('profitelo.components.interface.preloader-container', [
    'pascalprecht.translate',
    'profitelo.components.interface.preloader'
  ])
    .component('preloaderContainer', component)
}())
