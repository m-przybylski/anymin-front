export interface IExpertInviteEmployeesControllerScope extends ng.IScope {
}

export class ExpertInviteEmployeesController implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}
}
