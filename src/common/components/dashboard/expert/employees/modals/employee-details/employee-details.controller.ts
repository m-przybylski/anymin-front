export interface IExpertEmployeeDetailsModalScope extends ng.IScope {}

export class ExpertEmployeeDetailsModalController implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true

  public onModalClose = () => {
    this.$uibModalInstance.dismiss('cancel')
  }

  public tags: Array<any> = [
    {name: 'tag-1'},
    {name: 'tag-2'}
  ]

  public cosultationPrice: string = '7,49 PLN/MIN'

  public invitePendingTime: string = '4 days ago'

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

}
