export interface IExpertPayoutCivilModalScope extends ng.IScope {
  sueId: string;
}

export class ExpertPayoutCivilModalConttroller implements ng.IController {
  public isFullscreen: boolean = true;
  public isNavbar: boolean = true;

  public recommendedTag = [
    {name: 'tagtest'},
    {name: 'tagtetst2'}
  ];

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel');
  }

  static $inject = ['$uibModalInstance'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

}
