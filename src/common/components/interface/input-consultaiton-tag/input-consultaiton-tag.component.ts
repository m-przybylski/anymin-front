import {InputConsultationTagComponentController} from './input-consultaiton-tag.controller'

export class InputConsultationTagComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = InputConsultationTagComponentController
  template = require('./input-consultaiton-tag.pug')()
  bindings: {[boundProperty: string]: string} = {
    dictionary: '<',
    selectedTags: '=?',
    isValid: '<',
    validationText: '@',
    isSubmitted: '<'
  }
}
