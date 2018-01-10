import {IValidationAlertBindings} from './validation-alert'

export class ValidationAlertComponentController implements IValidationAlertBindings {
  alertText: string
  isVisible: boolean
  additionalText?: string
  constructor() {

  }
}
