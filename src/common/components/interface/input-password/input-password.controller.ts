import {IInputPasswordComponentBindings} from './input-password'

interface IInputTypes {
  text: string,
  tel: string,
  number: string
}

export class InputPasswordComponentController implements IInputPasswordComponentBindings {
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
  public ngPattern: string
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
    const digitsCodes = [13, 8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
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
