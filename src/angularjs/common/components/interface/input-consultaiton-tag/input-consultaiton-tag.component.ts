// tslint:disable:no-require-imports
import { InputConsultationTagComponentController } from './input-consultaiton-tag.controller';

// tslint:disable:member-ordering
export class InputConsultationTagComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = InputConsultationTagComponentController;
  public template = require('./input-consultaiton-tag.html');
  public bindings: {[boundProperty: string]: string} = {
    serviceName: '<',
    serviceDescription: '<',
    selectedTags: '=?',
    isValid: '<',
    validationText: '@',
    isSubmitted: '<'
  };
}
