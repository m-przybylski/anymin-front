import {IInputPasswordComponentBindings} from './input-password'
import {IInputTypes} from '../input/input.controller'
import {KeyboardKeyCodes} from '../../../classes/keyboard-key-codes'

export class InputPasswordComponentController implements IInputPasswordComponentBindings {
  private inputType: IInputTypes = {
    text: 'text',
    tel: 'tel',
    number: 'number'
  }

  public id: string
  public name: string
  public type: string = this.inputType.text
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
    if (this.type === this.inputType.tel) {
      this.blockInvalidPhonenumberDigits()
    }
  }

  public blockInvalidPhonenumberDigits = (): void => {
    const digitsCodes = [KeyboardKeyCodes.keyCodes.enter,
      KeyboardKeyCodes.keyCodes.backspace,
      KeyboardKeyCodes.keyCodes.one,
      KeyboardKeyCodes.keyCodes.two,
      KeyboardKeyCodes.keyCodes.three,
      KeyboardKeyCodes.keyCodes.four,
      KeyboardKeyCodes.keyCodes.five,
      KeyboardKeyCodes.keyCodes.six,
      KeyboardKeyCodes.keyCodes.seven,
      KeyboardKeyCodes.keyCodes.eight,
      KeyboardKeyCodes.keyCodes.nine,
      KeyboardKeyCodes.keyCodes.zero]
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
