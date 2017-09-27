import {IInputPriceComponentBindings} from './input-price'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'
import {keyboardCodes} from '../../../classes/keyboard'

export class InputPriceComponentController implements IInputPriceComponentBindings {
  public id: string
  public name: string
  public ngModel: number = 0
  public inputText: string
  public placeholder: string = '0.00'
  public isUsignPunctuationMarks: boolean = false
  public digitsCodesBlocked: number[] = []
  public isFocus: boolean = false
  public isDirty: boolean = false
  public currency: string
  public isPatternValid: boolean
  private priceRegexp: RegExp
  public callback: (num: number) => boolean
  public isValidate: boolean
  public isDisabled: boolean = false

  /* @ngInject */
  constructor(private $element: ng.IRootElementService, CommonSettingsService: CommonSettingsService) {
    this.priceRegexp = CommonSettingsService.localSettings.pricePattern
  }

  $onInit(): void {
    const digitsCodes = [keyboardCodes.enter,
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
      keyboardCodes.dot,
      keyboardCodes.arrowRight,
      keyboardCodes.arrowLeft,
      keyboardCodes.comma,
      keyboardCodes.commaASCI,
      keyboardCodes.dot,
      keyboardCodes.dotASCI
    ]

    this.blockInvalidDigits(digitsCodes)
    this.isPatternValid = true
  }

  public blockInvalidDigits = (digitsCodes: number[]): void => {
    this.$element.find('input').bind('keypress keydown', (event) => {
      if (this.isKeyAllowed(digitsCodes, event) && this.isCtrlKeyAllowed(event) ||
        this.digitsCodesBlocked.indexOf(event.keyCode) >= 0) {
        event.preventDefault()
      }
    })
  }

  private isCtrlKeyAllowed = (event: JQueryKeyEventObject): boolean => !(event.ctrlKey || event.metaKey)

  private isKeyAllowed = (digitsCodes: number[], event: JQueryKeyEventObject): boolean => {
    const code = event.keyCode || event.which
    return digitsCodes.indexOf(code) === -1
  }

  public onChange = (): void => {
    this.isUsignPunctuationMarks = this.ngModel.toString().indexOf('.') !== -1 ||
                                   this.ngModel.toString().indexOf(',') !== -1
    this.isPatternValid = ((this.priceRegexp).test(this.ngModel.toString()))

    if (this.isUsignPunctuationMarks) {
      this.digitsCodesBlocked = [keyboardCodes.dot, keyboardCodes.comma, keyboardCodes.dotASCI, keyboardCodes.commaASCI]
    } else {
      this.digitsCodesBlocked = []
    }

    if (this.callback) {
      this.callback(this.ngModel)
    }
  }

  public onFocus = (): void => {
    this.isFocus = true
    this.isDirty = true
  }

  public onBlur = (): void => {
    this.isFocus = false
  }

  $onDestroy = (): void => {
    this.$element.find('input').unbind('keypress keydown')
  }
}
