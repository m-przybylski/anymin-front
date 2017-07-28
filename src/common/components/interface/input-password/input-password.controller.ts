import {IInputPasswordComponentBindings} from './input-password'
import {IInputTypes} from '../input/input.controller'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

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
  constructor(private $element: JQuery, private CommonSettingsService: CommonSettingsService) {}

  $onInit(): void {
    if (this.type === this.inputType.tel) {
      this.blockInvalidPhonenumberDigits()
    }
  }

  public blockInvalidPhonenumberDigits = (): void => {
    const digitsCodes = [this.CommonSettingsService.keyboardKeyCodes.enter,
      this.CommonSettingsService.keyboardKeyCodes.backspace,
      this.CommonSettingsService.keyboardKeyCodes.one,
      this.CommonSettingsService.keyboardKeyCodes.two,
      this.CommonSettingsService.keyboardKeyCodes.three,
      this.CommonSettingsService.keyboardKeyCodes.four,
      this.CommonSettingsService.keyboardKeyCodes.five,
      this.CommonSettingsService.keyboardKeyCodes.six,
      this.CommonSettingsService.keyboardKeyCodes.seven,
      this.CommonSettingsService.keyboardKeyCodes.eight,
      this.CommonSettingsService.keyboardKeyCodes.nine,
      this.CommonSettingsService.keyboardKeyCodes.zero]
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
