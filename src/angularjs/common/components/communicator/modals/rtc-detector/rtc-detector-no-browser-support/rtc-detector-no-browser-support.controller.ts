export interface IRtcDetectorNoBrowserSupportModalControllerScope extends ng.IScope {
}

export class RtcDetectorNoBrowserSupportModalController implements ng.IController {

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')
}
