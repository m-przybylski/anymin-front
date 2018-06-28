// tslint:disable:readonly-array
// tslint:disable:no-duplicate-imports
// tslint:disable:deprecation
import { GetTag } from 'profitelo-api-ng/model/models';
import { MoneyDto } from 'profitelo-api-ng/model/models';

export interface IExpertEmployeeDetailsModalScope extends ng.IScope {
  sueId: string;
}

// tslint:disable:member-ordering
export class ExpertEmployeeDetailsModalController implements ng.IController {
  public isFullscreen = true;
  public isNavbar = true;

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel');
  }

  public tags: GetTag[] = [
    {
      id: 'mockId',
      name: 'tag-1',
      status: GetTag.StatusEnum.NEW
    },
    {
      id: 'mockId2',
      name: 'tag-2',
      status: GetTag.StatusEnum.NEW
    }
  ];

  public cosultationPrice: MoneyDto = {
    amount: 705,
    currency: 'PLN'
  };

  public invitePendingTime = '4 days ago';

  public static $inject = ['$uibModalInstance'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

}
