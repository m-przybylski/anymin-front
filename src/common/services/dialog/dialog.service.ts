module profitelo.services.dialog {

  export interface IDialogService {
    openDialog(options?: ng.ui.bootstrap.IModalSettings)
  }

  class DialogService implements IDialogService {

    constructor(private $uibModal: ng.ui.bootstrap.IModalService) {
    }

    /**
     *
     * Full options list can be found in the angular bootstrap docs
     * @link https://angular-ui.github.io/bootstrap/#/modal
     *
     * @param {Object} options - uibModal's options object
     *
     * @returns {Object} uibModal
     */
    public openDialog = (options: ng.ui.bootstrap.IModalSettings = {}) => {

      let _options: ng.ui.bootstrap.IModalSettings = {
        backdrop: 'static',
        keyboard: true,
        animation: true,
        size: '300',
        controllerAs: 'vm'
      }

      _options = angular.extend({}, _options, options)

      return this.$uibModal.open(_options)
    }
  }

  angular.module('profitelo.services.dialog', [
    'ui.bootstrap'
  ])
  .service('dialogService', DialogService)
}