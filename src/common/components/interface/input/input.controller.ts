import {IInputComponentBindings} from './input'

export class InputComponentController implements IInputComponentBindings {
  public id: string
  public name: string
  public inputText: string = ''
  public placeholder: string
  public validationText: string
  public maxLength: string = ''
  public isValid: boolean
  public ngRequired: boolean = false
  public ngModel: boolean = false
  public ngPattern: string
  public isFocus: boolean = false
  public isDirty: boolean = false

  /* @ngInject */
  constructor($element: any) {
    const digitsCodes = [13, 8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
    const element = $element.find('input')[0]

    if (element.hasAttribute('no-digits')) {
      $element.find('input').bind('keypress', (e: KeyboardEvent) => {
        const code = e.keyCode || e.which

        if (digitsCodes.indexOf(code) >= 0) {
          e.preventDefault()
        }
      })
    }
  }

  public onFocus = (): void => {
    this.isFocus = true
    this.isDirty = true
  }

  public onBlur = (): void => {
    this.isFocus = false
  }
}
