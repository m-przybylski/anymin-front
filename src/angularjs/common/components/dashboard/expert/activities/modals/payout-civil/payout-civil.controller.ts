// tslint:disable:readonly-array
// tslint:disable:deprecation
export interface IExpertPayoutCivilModalScope extends ng.IScope {
  sueId: string;
}

// tslint:disable:member-ordering
export class ExpertPayoutCivilModalConttroller implements ng.IController {
  public isFullscreen = true;
  public isNavbar = true;

  public recommendedTag = [
    {name: 'tagtest'},
    {name: 'tagtetst2'}
  ];

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel');
  }

  public static $inject = ['$uibModalInstance'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

}
