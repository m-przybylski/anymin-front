import {IInputConsultationEmployeeBindings} from './input-consultation-employee'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'
import {CSVFileReader} from './CSVFileReader'

const phoneNumbers = require('libphonenumber-js')

export class InputConsultationEmployeeComponentController implements IInputConsultationEmployeeBindings {
  public addedItemsList: string[] = []
  public inputValue: string
  public isOwnerEmployee: boolean
  public isDirty: boolean = false
  public isInputValueInvalid: boolean = false
  public isUploadFileIsInvalid: boolean = false
  public areUploadedFilesInvalid: boolean = false
  public wrongValuesCounter: number
  private mailRegexp: RegExp
  private phonePattern: RegExp
  public isFocus: boolean = false
  public isValidEmployee: boolean = false
  public isSubmitted: boolean = false
  public isCheckboxVisible: boolean = true
  public isMaxConsultationCountError: boolean = false

  private readonly validationTime: number = 3000
  private CSVFileReader: CSVFileReader

  private static readonly defaultCountryPrefix = '+48'
  private consultationInvitationsMaxCount: number

  static $inject = ['CommonSettingsService', '$timeout'];

    constructor(private CommonSettingsService: CommonSettingsService,
              private $timeout: ng.ITimeoutService) {
    this.CSVFileReader = new CSVFileReader
    this.assignValidationValues()
  }

  private getPrefixPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber.indexOf(InputConsultationEmployeeComponentController.defaultCountryPrefix) !== -1) {
      return phoneNumber.replace(InputConsultationEmployeeComponentController.defaultCountryPrefix,
        InputConsultationEmployeeComponentController.defaultCountryPrefix + ' ')
    } else {
      return InputConsultationEmployeeComponentController.defaultCountryPrefix + ' ' + phoneNumber
    }
  }

  private deleteIncorrectPhoneSigns = (inputValue: string): string =>
    inputValue.replace(/ /g, '').replace(/-/g, '')

  private isValidPhoneNumber = (inputValue: string): boolean =>
  inputValue.length > 0 && this.phonePattern.test(inputValue)

  private isValidEmailAddress = (inputValue: string): boolean =>
  inputValue.length > 0 && this.mailRegexp.test(inputValue)

  public isEmployeeExist = (inputValue: string): boolean =>
  this.addedItemsList.indexOf(inputValue) !== -1

  public onEnter = (inputValue: string): void => {
    this.isValidEmployee = this.isEmployeeExist(inputValue)

    if (phoneNumbers.isValidNumber(inputValue, 'PL')) {
      const correctValue = this.getFullPhoneNumber(inputValue)

      if (this.isValidPhoneNumber(correctValue) && !this.isMaxInvitationsCountReached())
        this.addEmployee(correctValue)
    }
    else if (this.isValidEmailAddress(inputValue) && !this.isMaxInvitationsCountReached()) {
      this.addEmployee(inputValue)
    }
    else if (this.isMaxInvitationsCountReached()) {
      this.isMaxConsultationCountError = true
    }
    else {
      this.isInputValueInvalid = true
      this.isValidEmployee = false
    }
  }

  private addEmployee = (contactValue: string): void => {
    if (!this.isEmployeeExist(contactValue)) {
      this.addedItemsList.push(contactValue)
      this.inputValue = ''
      this.isValidEmployee = false
    } else {
      this.isValidEmployee = true
    }
    this.isInputValueInvalid = false
  }

  private getFullPhoneNumber = (inputValue: string): string =>
    this.getPrefixPhoneNumber(this.deleteIncorrectPhoneSigns(inputValue))

  public deleteSelectedItem = (index: number): void => {
    this.addedItemsList.splice(index, 1)
    this.isMaxConsultationCountError = this.areInvitationsExceedValidLimit()
  }

  public onFocus = (): void => {
    this.isFocus = true
  }

  public onBlur = (): void => {
    this.isDirty = true
    this.isFocus = false
    this.isInputValueInvalid = false
    this.isValidEmployee = false
    this.isMaxConsultationCountError = false
  }

  public uploadCSVFile = (files: FileList): void => {
    this.CSVFileReader.read(files[0], this.onLoadFile, this.handleErrorUpload)
  }

  private onLoadFile = (mailOrNumberList: string[]): void => {
    this.wrongValuesCounter = 0
    mailOrNumberList.forEach((mailOrNumber) => {
      if (mailOrNumber.length > 0 && !(this.addedItemsList.indexOf(mailOrNumber) !== -1) &&
        (this.mailRegexp.test(mailOrNumber) || phoneNumbers.isValidNumber(mailOrNumber))) {
        this.addedItemsList.push(mailOrNumber)
      } else {
        this.wrongValuesCounter++
      }
    })
    if (this.wrongValuesCounter > 0) {
      this.showInvalidRecordsError()
    }
    if (mailOrNumberList.length < 1) {
      this.showFileUploadError()
    }
    this.isMaxConsultationCountError = this.areInvitationsExceedValidLimit()
  }

  private handleErrorUpload = (): void => {
    this.showFileUploadError()
  }

  private showFileUploadError = (): void => {
    this.$timeout(() => {
      this.isUploadFileIsInvalid = false
    }, this.validationTime)
    this.isUploadFileIsInvalid = true
  }

  private showInvalidRecordsError = (): void => {
    this.$timeout(() => {
      this.areUploadedFilesInvalid = false
    }, this.validationTime)
    this.areUploadedFilesInvalid = true
  }

  private isMaxInvitationsCountReached = (): boolean =>
    this.addedItemsList.length >= this.consultationInvitationsMaxCount

  private areInvitationsExceedValidLimit = (): boolean =>
    this.addedItemsList.length > this.consultationInvitationsMaxCount

  private assignValidationValues = (): void => {
    const localSettings = this.CommonSettingsService.localSettings
    this.consultationInvitationsMaxCount = localSettings.consultationInvitationsMaxCount
    this.mailRegexp = localSettings.emailPattern
    this.phonePattern = localSettings.phonePattern
  }
}
