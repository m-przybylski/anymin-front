import {Tag} from 'profitelo-api-ng/model/models';
import {MoneyDto} from 'profitelo-api-ng/model/models'

export interface IConsultationModalControllerScope extends ng.IScope {
}

export class ConsultationModalController implements ng.IController {

  public expertAvatar: string = 'cfdc5f156b804940a89e4bead38e269a'
  public consultationOwnerName: string = 'Super Firma'
  public consultationName: string = 'Najlepsza konsultacja'
  public consultationPrice: MoneyDto = {
    amount: 265,
    currency: 'PLN'
  }
  public conversationCount: number = 80
  public ratingValue: number = 80
  public commentCount: number = 80
  public consultationDescription: string = 'Opis najlepszej uslugi w miescie'
  public isLoading: boolean = false
  public isExpert: boolean = false
  public tags: Tag[] = [{
      id: 'id',
      name: 'tag',
      status: Tag.StatusEnum.NEW,
      persisted: false
    },
    {
      id: 'id',
      name: 'tag2',
      status: Tag.StatusEnum.NEW,
      persisted: false
    },
    {
      id: 'id',
      name: 'tag3',
      status: Tag.StatusEnum.NEW,
      persisted: false
    }]
  public employees: {}[] = [{
    name: 'Jan Kowalski'},
    {
      name: 'Adam Nowak'},
    {
      name: 'John Smith'},
    {
      name: 'Mr Bean'},
    {
      name: 'Poco Loco'}]

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  static $inject = ['$uibModalInstance'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

}
