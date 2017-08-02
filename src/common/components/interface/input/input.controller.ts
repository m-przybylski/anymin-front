import {IInputComponentBindings} from './input'
import {keyboardCodes} from '../../../classes/keyboard'

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
      this.blockInvalidDigits([keyboardCodes.backspace, keyboardCodes.enter, keyboardCodes.zero, keyboardCodes.one,
        keyboardCodes.two, keyboardCodes.three, keyboardCodes.four, keyboardCodes.five, keyboardCodes.six,
        keyboardCodes.seven, keyboardCodes.eight, keyboardCodes.nine])
    } else if (this.type === this.inputTypes.number) {
      this.blockInvalidDigits([keyboardCodes.dot, keyboardCodes.comma, keyboardCodes.backspace, keyboardCodes.enter,
        keyboardCodes.zero, keyboardCodes.one, keyboardCodes.two, keyboardCodes.three, keyboardCodes.four,
        keyboardCodes.five, keyboardCodes.six, keyboardCodes.seven, keyboardCodes.eight, keyboardCodes.nine])
    }
  }

  public blockInvalidDigits = (digitsCodes: number[]): void => {
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
