// tslint:disable:readonly-array
import * as ng from 'angular';

// tslint:disable:member-ordering
export class DialogService {

  public static $inject = ['$uibModal'];

    constructor(private $uibModal: ng.ui.bootstrap.IModalService) {
  }

  /**
   *
   * Full options list can be found in the angular bootstrap docs
   * @link https://angular-ui.github.io/bootstrap/#/modal
   *
   * @param options - uibModal's options object
   *
   * @returns uibModal
   */
  public openDialog = (options: ng.ui.bootstrap.IModalSettings = {}): ng.ui.bootstrap.IModalInstanceService => {

    let _options: ng.ui.bootstrap.IModalSettings = {
      backdrop: 'static',
      keyboard: true,
      animation: true,
      size: '300',
      controllerAs: 'vm'
    };

    _options = ng.extend({}, _options, options);

    return this.$uibModal.open(_options);
  }
}
