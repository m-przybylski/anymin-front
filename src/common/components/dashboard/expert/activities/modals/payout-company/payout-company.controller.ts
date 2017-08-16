export interface IExpertPayoutCompanyModalScope extends ng.IScope {
  isNavbar: boolean
  isFullscreen: boolean
  sueId: string
}

export class ExpertPayoutCompanyModalController implements ng.IController {

  public recommendedTag = [
    {name: 'tagtest'},
    {name: 'tagtetst2'}
  ]

  /* @ngInject */
  constructor($scope: IExpertPayoutCompanyModalScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance ) {
    $scope.isNavbar = true
    $scope.isFullscreen = true
  }

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

}
