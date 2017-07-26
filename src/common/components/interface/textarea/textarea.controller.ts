import {ITextareaComponentBindings} from './textarea'

export class TextareaComponentController implements ITextareaComponentBindings {
  public id: string
  public name: string
  public inputText: string = ''
  public placeholder: string
  public alertText: string
  public maxLength: string = ''
  public ngModel: boolean = false
  public isFocus: boolean = false
  public isDirty: boolean = false
  public isValid: boolean
  public validationText: string

  public onFocus = (): void => {
    this.isFocus = true
    this.isDirty = true
  }

  public onBlur = (): void => {
    this.isFocus = false
  }

  /* @ngInject */
  constructor() {}
}
