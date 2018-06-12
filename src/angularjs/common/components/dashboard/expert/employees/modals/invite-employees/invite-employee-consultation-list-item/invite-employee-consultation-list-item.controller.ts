import { GetTag } from 'profitelo-api-ng/model/models';
import { MoneyDto } from 'profitelo-api-ng/model/models';
import { GetService } from '@anymind-ng/api';
import { IInviteEmployeeConsultationListItemComponentBindings } from './invite-employee-consultation-list-item';
import { IGetServiceWithInvitationsAndTags }
  from '../../../../../../../../app/invitations/modal/invitations.controller';

export interface IConsultationListItemComponentScope extends ng.IScope {
  service: IGetServiceWithInvitationsAndTags;
}

export interface IGetServiceWithInvitationsWithTags extends GetService {
  tags?: GetTag[];
}

// tslint:disable:member-ordering
export class InviteEmployeeConsultationListItemComponentController
  implements IInviteEmployeeConsultationListItemComponentBindings {

  public service: IGetServiceWithInvitationsWithTags;
  public onChange: (service: GetService, isChecked: boolean) => void;
  public title: string;
  public price: MoneyDto;
  public tags?: GetTag[];
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
