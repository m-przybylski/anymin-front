import {RadioBtnTextareaComponentController} from './radio-btn-textarea.controller'

export class RadioBtnTextareaComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = RadioBtnTextareaComponentController
  template = require('./radio-btn-textarea.html')
  bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    value: '@',
    label: '@',
    ngModel: '@',
    checkedItem: '@',
    onSelectedItem: '<',
    onDescriptionCallback: '<',
    isTextarea: '<'
  }
}
