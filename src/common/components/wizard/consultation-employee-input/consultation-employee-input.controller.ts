import {IConsultationEmployeeInputBindings} from './consultation-employee-input'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'
import {CSVFileReader} from './CSVFileReader'

const phoneNumbers = require('libphonenumber-js')

export class ConsultationEmployeeInputComponentController implements IConsultationEmployeeInputBindings {
  public addedItemsList: string[] = []
  public inputValue: string
  public isOwnerEmployee: boolean
  public isDirty: boolean = false
  public isInputValueInvalid: boolean = false
  public isUploadFileIsInvalid: boolean = false
  public areUploadedFilesInvalid: boolean = false
  public wrongValuesCounter: number
  private mailRegexp: RegExp

  private readonly validationTime: number = 3000
  private CSVFileReader: CSVFileReader

  /* @ngInject */
  constructor(CommonSettingsService: CommonSettingsService, private $timeout: ng.ITimeoutService) {
    this.mailRegexp = CommonSettingsService.localSettings.emailPattern
    this.CSVFileReader = new CSVFileReader
  }

  public onEnter = (): void => {
    if (this.inputValue.length > 0 && !(this.addedItemsList.indexOf(this.inputValue) !== -1) &&
      (this.mailRegexp.test(this.inputValue) || phoneNumbers.isValidNumber(this.inputValue))) {
      this.isInputValueInvalid = false
      this.addedItemsList.push(this.inputValue)
      this.inputValue = ''
    } else {
      this.isInputValueInvalid = true
    }
  }

  public deleteSelectedItem = (index: number): void => {
    this.addedItemsList.splice(index, 1)
  }

  public onBlur = (): void => {
    this.isDirty = true
    this.isInputValueInvalid = false
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

}
