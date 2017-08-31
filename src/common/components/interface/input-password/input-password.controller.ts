import {IInputPasswordComponentBindings} from './input-password'
import {keyboardCodes} from '../../../classes/keyboard'

type InputTypes = 'text' | 'tel'

export class InputPasswordComponentController implements IInputPasswordComponentBindings {
  private inputTypeText: InputTypes = 'text'
  private inputTypeTel: InputTypes = 'tel'

  public id: string
  public name: string
  public type: string = this.inputTypeText
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
  constructor(private $element: JQuery) {}

  $onInit(): void {
    if (this.type === this.inputTypeTel) {
      this.blockInvalidPhonenumberDigits()
    }
  }

  public blockInvalidPhonenumberDigits = (): void => {
    const digitsCodes = [keyboardCodes.enter,
      keyboardCodes.backspace,
      keyboardCodes.one,
      keyboardCodes.two,
      keyboardCodes.three,
      keyboardCodes.four,
      keyboardCodes.five,
      keyboardCodes.six,
      keyboardCodes.seven,
      keyboardCodes.eight,
      keyboardCodes.nine,
      keyboardCodes.zero]
    this.$element.find('input').bind('keypress', (event) => {
      const code = event.keyCode || event.which
      if (!(digitsCodes.indexOf(code) !== -1)) {
        event.preventDefault()
      }
    })
  }

  public onFocus = (): void => {
    this.isFocus = true
    this.isDirty = true
  }

  public onBlur = (): void => {
    this.isFocus = false
  }
}
