export interface INoInvitationsModalScope extends ng.IScope {}

export class NoInvitationsModalController implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true

  public onModalClose = () => {
    this.$uibModalInstance.dismiss('cancel')
  }

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

}
