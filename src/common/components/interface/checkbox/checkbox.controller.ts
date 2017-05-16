import {CheckboxComponentBindings} from './checkbox'

export class CheckboxComponentController implements CheckboxComponentBindings {
  public inputText: string = ''
  public additionalText: string = ''
  public ngModel: boolean = false
  public isDisabled: boolean = false
  public isRequired: boolean = false
  public onChange?: ()=> void

  /* @ngInject */
  constructor() {
  }

  public onClick = () => {
    if (!this.isDisabled) {
      this.ngModel = !this.ngModel
    }

    if (this.onChange) {
      this.onChange()
    }
  }
}
