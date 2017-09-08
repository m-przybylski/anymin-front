import {IInputPasswordComponentBindings} from './input-password'

export class InputPasswordComponentController implements IInputPasswordComponentBindings {
  public id: string
  public name: string
  public type: string = 'password'
  public inputText: string = ''
  public placeholder: string
  public validationText: string
  public isValid: boolean
  public ngRequired: boolean = false
  public ngModel: string
  public isFocus: boolean = false
  public isDirty: boolean = false
  public onChange: string = ''

  /* @ngInject */
  constructor() {}

  public onFocus = (): void => {
    this.isFocus = true
    this.isDirty = true
  }

  public onBlur = (): void => {
    this.isFocus = false
  }
}
