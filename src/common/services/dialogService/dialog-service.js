(function() {
  function DialogService($uibModal) {

    return {

      /**
       *
       * Full options list can be found in the angular bootstrap docs
       * @link https://angular-ui.github.io/bootstrap/#/modal
       *
       * @param {Object} options - uibModal's options object
       */
      openDialog: (options = {}) => {

        let _options = {
          backdrop: 'static',
          keyboard: true,
          modalFade: true,
          animation: true,
          size: 300,
          controllerAs: 'vm'
        }

        _options = angular.extend({}, _options, options)

        $uibModal.open(_options)
      }
    }
  }

  angular.module('profitelo.services.dialog-service', [
    'ui.bootstrap'
  ])
    .service('DialogService', DialogService)

}())