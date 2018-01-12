import {ITextareaComponentBindings} from './textarea'

export class TextareaComponentController implements ITextareaComponentBindings {
  public id: string
  public name: string
  public inputText: string = ''
  public placeholder: string
  public alertText: string
  public maxLength: string = ''
  public ngModel: string = ''
  public isFocus: boolean = false
  public isDirty: boolean = false
  public isValid: boolean
  public validationText: string
  public onChange?: (description: string) => void

  static $inject = [];

  constructor() {}

  public onFocus = (): void => {
    this.isFocus = true
    this.isDirty = true
  }

  public onBlur = (): boolean =>
    this.isFocus = false

  public onDescriptionChange = (textareaValue: string): void =>
    (this.onChange) ? this.onChange(textareaValue) : undefined
}
