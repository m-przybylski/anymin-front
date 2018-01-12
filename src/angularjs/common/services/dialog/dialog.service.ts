import * as ng from 'angular'

export class DialogService {

  static $inject = ['$uibModal'];

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
  public openDialog = (options: ng.ui.bootstrap.IModalSettings = {}): ng.ui.bootstrap.IModalInstanceService => {

    let _options: ng.ui.bootstrap.IModalSettings = {
      backdrop: 'static',
      keyboard: true,
      animation: true,
      size: '300',
      controllerAs: 'vm'
    }

    _options = ng.extend({}, _options, options)

    return this.$uibModal.open(_options)
  }
}
