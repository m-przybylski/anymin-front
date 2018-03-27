import { IConsultationListItemComponentBindings } from './consultation-list-item';
import { GetServiceWithInvitation, Tag } from 'profitelo-api-ng/model/models';
import { MoneyDto } from 'profitelo-api-ng/model/models';
import { IGetServiceWithInvitationsAndTags } from '../../../../app/invitations/modal/invitations.controller';

export interface IConsultationListItemComponentScope extends ng.IScope {
  service: IGetServiceWithInvitationsAndTags;
}

// tslint:disable:member-ordering
export class ConsultationListItemComponentController implements IConsultationListItemComponentBindings {

  public service: IGetServiceWithInvitationsAndTags;
  public onChange: (service: GetServiceWithInvitation, isChecked: boolean) => void;
  public title: string;
  public price: MoneyDto;
  public tags?: Tag[];
  public inviteTime: string;
  public checkboxId: string;
  public isChecked = false;
  public isFreelance: boolean;
  public static $inject = [];

  constructor() {
  }

  public $onInit(): void {
    this.title = this.service.name;
    this.price = this.service.price;
    this.tags = this.service.tags;
    this.checkboxId = String(new Date().getTime()) + this.title;
    this.isFreelance = this.service.isFreelance;
  }

  public changeConsultationStatus = (): void => {
    this.onChange(this.service, this.isChecked);
  }

}
