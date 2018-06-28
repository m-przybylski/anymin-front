// tslint:disable:no-require-imports
import { ConsultationListItemComponentController } from './consultation-list-item.controller';

// tslint:disable:member-ordering
export class ConsultationListItemComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = ConsultationListItemComponentController;
  public template = require('./consultation-list-item.html');
  public bindings: {[boundProperty: string]: string} = {
    onChange: '<',
    service: '<',
    isChecked: '<'
  };
}
