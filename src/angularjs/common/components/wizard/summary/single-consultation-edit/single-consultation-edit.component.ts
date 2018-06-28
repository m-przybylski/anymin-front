// tslint:disable:no-require-imports
import { SingleConsultationEditComponentController } from './single-consultation-edit.controller';

// tslint:disable:member-ordering
export class SingleConsultationEditComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = SingleConsultationEditComponentController;
  public template = require('./single-consultation-edit.html');
  public bindings: {[boundProperty: string]: string} = {
    service: '<',
    onRemove: '<',
    onEdit: '<',
    isCompany: '<'
  };
}
