import {ICheckboxComponentBindings} from './checkbox'

export class CheckboxComponentController implements ICheckboxComponentBindings {
  public inputText: string = ''
  public additionalText: string = ''
  public name: string = ''
  public alertText: string = ''
  public validation: boolean = false
  public ngModel: boolean = false
  public isDisabled: boolean = false
  public ngRequired: boolean = false
  public onChange?: () => void

  /* @ngInject */
  constructor() {}

  public onClick = () => {
    if (!this.isDisabled) {
      this.ngModel = !this.ngModel
    }

    if (this.onChange) {
      this.onChange()
    }
  }
}
