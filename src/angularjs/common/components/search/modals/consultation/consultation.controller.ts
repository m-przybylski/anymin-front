// tslint:disable:no-empty-interface
// tslint:disable:no-duplicate-imports
// tslint:disable:deprecation
import { GetTag } from 'profitelo-api-ng/model/models';
import { MoneyDto } from 'profitelo-api-ng/model/models';

export interface IConsultationModalControllerScope extends ng.IScope {
}

// tslint:disable:member-ordering
export class ConsultationModalController implements ng.IController {

  public expertAvatar = 'cfdc5f156b804940a89e4bead38e269a';
  public consultationOwnerName = 'Super Firma';
  public consultationName = 'Najlepsza konsultacja';
  public consultationPrice: MoneyDto = {
    amount: 265,
    currency: 'PLN'
  };
  public conversationCount = 80;
  public ratingValue = 80;
  public commentCount = 80;
  public consultationDescription = 'Opis najlepszej uslugi w miescie';
  public isLoading = false;
  public isExpert = false;
  public tags: GetTag[] = [{
      id: 'id',
      name: 'tag',
      status: GetTag.StatusEnum.NEW
    },
    {
      id: 'id',
      name: 'tag2',
      status: GetTag.StatusEnum.NEW
    },
    {
      id: 'id',
      name: 'tag3',
      status: GetTag.StatusEnum.NEW
    }];
  public employees: {}[] = [{
    name: 'Jan Kowalski'},
    {
      name: 'Adam Nowak'},
    {
      name: 'John Smith'},
    {
      name: 'Mr Bean'},
    {
      name: 'Poco Loco'}];

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  public static $inject = ['$uibModalInstance'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

}
