// tslint:disable:deprecation
export interface IExpertPayoutCompanyModalScope extends ng.IScope {
  isNavbar: boolean;
  isFullscreen: boolean;
  sueId: string;
}

// tslint:disable:member-ordering
export class ExpertPayoutCompanyModalController implements ng.IController {

  public recommendedTag = [
    {name: 'tagtest'},
    {name: 'tagtetst2'}
  ];

  public static $inject = ['$scope', '$uibModalInstance'];

    constructor($scope: IExpertPayoutCompanyModalScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
    $scope.isNavbar = true;
    $scope.isFullscreen = true;
  }

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

}
