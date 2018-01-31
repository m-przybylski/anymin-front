import { ExpertEmployeeComponentController } from './employee.controller';
// tslint:disable:member-ordering
export class ExpertEmployeeComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = ExpertEmployeeComponentController;
  public template = require('./employee.html');
  public bindings: {[boundProperty: string]: string} = {
    profileWithEmployments: '<',
    onDeleteCallback: '<'
  };
}
