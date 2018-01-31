import { InputConsultationEmployeeComponentController } from './input-consultation-employee.controller';

// tslint:disable:member-ordering
export class InputConsultationEmployeeComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = InputConsultationEmployeeComponentController;
  public template = require('./input-consultation-employee.html');
  public bindings: {[boundProperty: string]: string} = {
    addedItemsList: '=?',
    isOwnerEmployee: '=?',
    isValid: '<',
    isSubmitted: '<',
    validationText: '@',
    isCheckboxVisible: '<?'
  };
}
