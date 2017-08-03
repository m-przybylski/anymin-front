import {IInputComponentBindings} from './input'
import {KeyboardKeyCodes} from '../../../classes/keyboard-key-codes'

export interface IInputTypes {
  text: string,
  tel: string,
  number: string
}

export class InputComponentController implements IInputComponentBindings {
  private inputTypes: IInputTypes = {
    text: 'text',
    tel: 'tel',
    number: 'number'
  }

  public id: string
  public name: string
  public type: string = this.inputTypes.text
  public inputText: string = ''
  public placeholder: string
  public validationText: string
  public maxLength: string = ''
  public isValid: boolean
  public ngRequired: boolean = false
  public ngModel: string
  public isFocus: boolean = false
  public isDirty: boolean = false
  public onChange: string = ''

  /* @ngInject */
  constructor(private $element: JQuery) {}

  $onInit(): void {
    if (this.type === this.inputTypes.tel) {
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
