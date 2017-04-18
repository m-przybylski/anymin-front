export interface IExpertPayoutCompanyModalScope extends ng.IScope {}

export class ExpertPayoutCompanyModalController implements ng.IController {

  public recommendedTag = [
    {name: 'tagtest'},
    {name: 'tagtetst2'}
  ]

  /* @ngInject */
  constructor($scope: IExpertPayoutCompanyModalScope, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance ) {
    $scope.isNavbar = true
    $scope.isFullscreen = true
  }

  public onModalClose = () =>
    this.$uibModalInstance.dismiss('cancel')

}
