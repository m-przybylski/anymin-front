export interface IExpertPayoutCivilModalScope extends ng.IScope {}

export class ExpertPayoutCivilModalConttroller implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true

  public recommendedTag = [
    {name: 'tagtest'},
    {name: 'tagtetst2'}
  ]

  public onModalClose = () => {
    this.$uibModalInstance.dismiss('cancel')
  }

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

}
