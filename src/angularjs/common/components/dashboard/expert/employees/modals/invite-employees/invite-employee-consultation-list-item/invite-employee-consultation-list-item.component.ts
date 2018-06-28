// tslint:disable:no-require-imports
import { InviteEmployeeConsultationListItemComponentController }
  from './invite-employee-consultation-list-item.controller';

// tslint:disable:member-ordering
export class ConsultationListItemComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = InviteEmployeeConsultationListItemComponentController;
  public template = require('./invite-employee-consultation-list-item.html');
  public bindings: {[boundProperty: string]: string} = {
    onChange: '<',
    service: '<',
    isChecked: '<'
  };
}
