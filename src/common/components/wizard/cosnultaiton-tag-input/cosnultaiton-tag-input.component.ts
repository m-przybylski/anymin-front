import {ConsultationTagInputComponentController} from './cosnultaiton-tag-input.controller'

export class ConsultationTagInputComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ConsultationTagInputComponentController
  template = require('./cosnultaiton-tag-input.pug')()
  bindings: {[boundProperty: string]: string} = {
    dictionary: '<',
    selectedTags: '=?',
    isValid: '<',
    validationText: '@',
    isSubmitted: '<'
  }
}
