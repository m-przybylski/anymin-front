export interface IRtcDetectorNoBrowserSupportModalControllerScope extends ng.IScope {
}

export class RtcDetectorNoBrowserSupportModalController implements ng.IController {

  static $inject = ['$uibModalInstance'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')
}
