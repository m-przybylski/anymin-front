export interface IRtcDetectorNoBrowserSupportModalControllerScope extends ng.IScope {
}

// tslint:disable:member-ordering
export class RtcDetectorNoBrowserSupportModalController implements ng.IController {

  public static $inject = ['$uibModalInstance'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')
}
