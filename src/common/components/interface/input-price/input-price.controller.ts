import {IInputPriceComponentBindings} from './input-price'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

export class InputPriceComponentController implements IInputPriceComponentBindings {
  public id: string
  public name: string
  public ngModel: number = 0
  public validationText: string
  public placeholder: string = '0.00'
  public isUsignPunctuationMarks: boolean = false
  public digitsCodesBlocked: number[] = []
  public isValid: boolean
  public isFocus: boolean = false
  public isDirty: boolean = false
  public currency: string
  public isPatternValid: boolean
  private priceRegexp: RegExp
  private CommonSettingsService: CommonSettingsService

  /* @ngInject */
  constructor($element: ng.IRootElementService, CommonSettingsService: CommonSettingsService) {
    this.priceRegexp = CommonSettingsService.localSettings.pricePattern
    const validKeyCodes = [CommonSettingsService.keyboardKeyCodes.enter,
      CommonSettingsService.keyboardKeyCodes.backspace,
      CommonSettingsService.keyboardKeyCodes.zero,
      CommonSettingsService.keyboardKeyCodes.one,
      CommonSettingsService.keyboardKeyCodes.two,
      CommonSettingsService.keyboardKeyCodes.three,
      CommonSettingsService.keyboardKeyCodes.four,
      CommonSettingsService.keyboardKeyCodes.five,
      CommonSettingsService.keyboardKeyCodes.six,
      CommonSettingsService.keyboardKeyCodes.seven,
      CommonSettingsService.keyboardKeyCodes.eight,
      CommonSettingsService.keyboardKeyCodes.nine,
      CommonSettingsService.keyboardKeyCodes.comma,
      CommonSettingsService.keyboardKeyCodes.dot]

    $element.bind('keypress', (e) => {
      if (validKeyCodes.indexOf(e.keyCode) === -1 || this.digitsCodesBlocked.indexOf(e.keyCode) >= 0) {
        e.preventDefault()
      }
    })
  }

  $onInit(): void {
    this.isPatternValid = true
  }

  public onChange = (): void => {
    this.isUsignPunctuationMarks = this.ngModel.toString().indexOf('.') !== -1 ||
                                   this.ngModel.toString().indexOf(',') !== -1
    this.isPatternValid = ((this.priceRegexp).test(this.ngModel.toString()))

    if (this.isUsignPunctuationMarks) {
      this.digitsCodesBlocked = [this.CommonSettingsService.keyboardKeyCodes.dot,
        this.CommonSettingsService.keyboardKeyCodes.comma]
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
