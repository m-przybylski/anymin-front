import {ConsultationTagInputComponentController} from './consultaiton-tag-input.controller'

export class ConsultationTagInputComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ConsultationTagInputComponentController
  template = require('./consultaiton-tag-input.pug')()
  bindings: {[boundProperty: string]: string} = {
    dictionary: '<',
    selectedTags: '=?',
    isValid: '<',
    validationText: '@',
    isSubmitted: '<'
  }
}
