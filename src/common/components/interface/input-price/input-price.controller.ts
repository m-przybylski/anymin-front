import {IInputPriceComponentBindings} from './input-price'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'
import {keyboardCodes} from '../../../classes/keyboard'

export class InputPriceComponentController implements IInputPriceComponentBindings {
  public id: string
  public name: string
  public ngModel: number = 0
  public validationText: string
  public inputText: string
  public placeholder: string = '0.00'
  public isUsignPunctuationMarks: boolean = false
  public digitsCodesBlocked: number[] = []
  public isValid: boolean
  public isFocus: boolean = false
  public isDirty: boolean = false
  public currency: string
  public isPatternValid: boolean
  private priceRegexp: RegExp
  public ngPattern: RegExp

  /* @ngInject */
  constructor($element: ng.IRootElementService, CommonSettingsService: CommonSettingsService) {
    this.priceRegexp = CommonSettingsService.localSettings.pricePattern
    const validKeyCodes = [keyboardCodes.enter,
      keyboardCodes.backspace,
      keyboardCodes.zero,
      keyboardCodes.one,
      keyboardCodes.two,
      keyboardCodes.three,
      keyboardCodes.four,
      keyboardCodes.five,
      keyboardCodes.six,
      keyboardCodes.seven,
      keyboardCodes.eight,
      keyboardCodes.nine,
      keyboardCodes.comma,
      keyboardCodes.dot]

    $element.bind('keypress', (e) => {
      if (validKeyCodes.indexOf(e.keyCode) === -1 || this.digitsCodesBlocked.indexOf(e.keyCode) >= 0) {
        e.preventDefault()
      }
    })
  }

  $onInit(): void {
    this.isPatternValid = true

    if (this.ngPattern)
      this.priceRegexp = this.ngPattern
  }

  public onChange = (): void => {
    this.isUsignPunctuationMarks = this.ngModel.toString().indexOf('.') !== -1 ||
                                   this.ngModel.toString().indexOf(',') !== -1
    this.isPatternValid = ((this.priceRegexp).test(this.ngModel.toString()))

    if (this.isUsignPunctuationMarks) {
      this.digitsCodesBlocked = [keyboardCodes.dot,
        keyboardCodes.comma]
    } else {
      this.digitsCodesBlocked = []
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
