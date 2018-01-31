import { InputConsultationTagComponentController } from './input-consultaiton-tag.controller';

export class InputConsultationTagComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = InputConsultationTagComponentController;
  template = require('./input-consultaiton-tag.html');
  bindings: {[boundProperty: string]: string} = {
    serviceName: '<',
    serviceDescription: '<',
    selectedTags: '=?',
    isValid: '<',
    validationText: '@',
    isSubmitted: '<'
  };
}
