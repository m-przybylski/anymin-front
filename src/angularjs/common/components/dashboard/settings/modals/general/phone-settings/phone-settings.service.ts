import {AccountApi} from 'profitelo-api-ng/api/api'
import {httpCodes} from '../../../../../../classes/http-codes'
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'
import {UserService} from '../../../../../../services/user/user.service'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'
import {AccountDetails} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
import {Subject} from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'

const phonenumbers = require('libphonenumber-js')

export interface IPrefixListElement {
  value: string
  name: string
}

interface ISendedSMS {
  phoneNumber: string,
  date: number
}

export class PhoneSettingsService {
  private isNumberExist: boolean = false
  private isButtonDisabled: boolean = false

  private counter: number
  private numberPattern = this.CommonSettingsService.localSettings.phoneNumberPattern
  private prefixList: IPrefixListElement[] = this.CommonSettingsService.localSettings.countryCodes
  .map((countryCode: string) => ({
    value: countryCode,
    name: countryCode
  }))
  private prefix: string = this.prefixList[0].value
  private sendedSMSArray: ISendedSMS[] = []

  private interval: ng.IPromise<ng.IIntervalService>
  private readonly events = {
    onCountDownUpdate: new Subject<number>(),
    onNewPhoneNumberCreate: new Subject<boolean>()
  }
  private static readonly oneSecondInMillisecond: number = 1000
  private static readonly timeToResend: number = 30

  /* @ngInject */
  constructor(private AccountApi: AccountApi,
              private errorHandler: ErrorHandlerService,
              private userService: UserService,
              private CommonSettingsService: CommonSettingsService,
              private $interval: ng.IIntervalService,
              private $log: ng.ILogService) {
  }

  public onCountDownUpdate = (cb: (value: number) => void): Subscription =>
    this.events.onCountDownUpdate.subscribe(cb)

  public onNewPhoneNumberCreate = (cb: (value: boolean) => boolean): Subscription =>
    this.events.onNewPhoneNumberCreate.subscribe(cb)

  private setNewNumber = (phoneNumber: string): ng.IPromise<void> =>
    this.AccountApi.newMsisdnVerificationRoute({unverifiedMsisdn: this.prefix + phoneNumber})
    .then(() => {
      this.events.onNewPhoneNumberCreate.next(true)
    }).catch((err) => {
      if (err.status === httpCodes.conflict) {
        this.isNumberExist = true
        this.isButtonDisabled = true
      } else {
        this.errorHandler.handleServerError(err)
        this.$log.error('Can not send new phone number: ' + err)
      }
    })

  private startCountDown = (phoneNumber: string, time: number): void => {
    this.counter = PhoneSettingsService.timeToResend
    this.counter -= time
    this.isButtonDisabled = true

    this.interval = this.$interval(() => {
      this.counter--
      this.events.onCountDownUpdate.next(this.counter)
      if (this.counter === 0) {
        this.isButtonDisabled = false
        this.markNumberAsUnused(phoneNumber)
      }
    }, PhoneSettingsService.oneSecondInMillisecond, this.counter)
  }

  public clearInterval = (): boolean =>
    this.$interval.cancel(this.interval)

  public getPrefixList = (): IPrefixListElement[] => this.prefixList
  public updatePrefix = (prefix: IPrefixListElement): void => {
    this.prefix = prefix.value
  }

  private checkIsFormValid = (prefix: string, phoneNumber: string): boolean => {
    if (prefix && phoneNumber && this.numberPattern.test(phoneNumber)) {
      const fullPhoneNumber = phonenumbers.parse(prefix.toString() + phoneNumber.toString())
      return phonenumbers.isValidNumber(fullPhoneNumber)
    } else {
      return false
    }
  }

  public onNumberValid = (phoneNumber: string): boolean =>
    this.numberPattern.test(phoneNumber) && this.checkIsFormValid(this.prefix, phoneNumber)

  public onButtonDisabled = (phoneNumber: string): boolean =>
    !this.isButtonDisabled && this.onNumberValid(phoneNumber)

  public onPhoneNumberChange = (): void => {
    this.events.onNewPhoneNumberCreate.next(false)
    this.isButtonDisabled = false
    this.isNumberExist = false
  }

  public sendVerificationPin = (): ng.IPromise<AccountDetails> =>
    this.userService.getUser()

  public markNumberAsUsed = (phoneNumber: string): void => {
    this.events.onNewPhoneNumberCreate.next(false)
    this.clearInterval()

    const phoneObject = this.sendedSMSArray.find(el => el.phoneNumber === phoneNumber)

    if (phoneObject) {
      if (this.timeElapse(phoneObject.date) >= PhoneSettingsService.timeToResend) {
        phoneObject.date = Date.now()
      }
      this.isButtonDisabled = true
      this.startCountDown(phoneNumber, this.timeElapse(phoneObject.date))
    } else {
      this.sendedSMSArray = [...this.sendedSMSArray, {phoneNumber, date: Date.now()}]
      this.setNewNumber(phoneNumber)
    }
  }

  public getIsNumberExist = (): boolean => this.isNumberExist

  private markNumberAsUnused = (phoneNumber: string): void => {
    const phoneIndex = _.findIndex(
      this.sendedSMSArray, (el) =>
        el.phoneNumber === phoneNumber
    )
    this.sendedSMSArray.splice(phoneIndex, 1)
  }

  private timeElapse = (newValue: number): number =>
    Number(((Date.now() - newValue) / PhoneSettingsService.oneSecondInMillisecond)
    .toFixed(0))
}
