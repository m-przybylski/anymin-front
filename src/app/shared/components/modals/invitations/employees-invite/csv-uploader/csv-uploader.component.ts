// tslint:disable:no-null-keyword
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ParseError } from '@angular/compiler';
import { isValidNumber } from 'libphonenumber-js';
import { IValidatorsErrorMsg } from '@platform/shared/components/inputs/input-add-item/input-add-item.component';
import { PhoneNumberUnifyService } from '@platform/shared/services/phone-number-unify/phone-number-unify.service';
import { Config } from '../../../../../../../config';

@Component({
  selector: 'plat-csv-uploader',
  templateUrl: './csv-uploader.html',
  styleUrls: ['./csv-uploader.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsvUploaderComponent implements OnInit {
  @Input()
  public controlName: string;

  @Input()
  public form: FormGroup;

  @Input()
  public invitedEmployeeLength = 0;

  public incorrectInvitations = 0;

  @Input()
  public addedItems: ReadonlyArray<string> = [];

  public isError = false;

  @Output()
  public onUploadFile: EventEmitter<ReadonlyArray<string>> = new EventEmitter<ReadonlyArray<string>>();

  public addedItemsList: ReadonlyArray<string> = [];
  public inputValue: string;
  public isOwnerEmployee: boolean;
  public isInputValueInvalid = false;
  public isUploadFileIsInvalid = false;
  public areUploadedFilesInvalid = false;

  public hasRecords = false;
  public isFocus = false;
  public isValidEmployee = false;
  public isSubmitted = false;
  public isCheckboxVisible = true;
  public isMaxConsultationCountError = false;
  public uploadedFilesLength = 0;
  private logger: LoggerService;
  private mailPattern: RegExp;
  private consultationInvitationsMaxCount: number;
  private errorsMsg: IValidatorsErrorMsg = {
    SOMETHING_WENT_WRONG: {
      code: 'SOMETHING_WENT_WRONG',
      text: 'CSV_UPLOADER.ERROR.SOMETHING_WENT_WRONG',
    },
  };

  constructor(
    private formUtils: FormUtilsService,
    private phoneNumberUnifyService: PhoneNumberUnifyService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CsvUploaderComponent');
    this.assignValidationValues();
  }

  public ngOnInit(): void {
    this.form.addControl(this.controlName, new FormControl('', []));
  }

  public isFieldInvalid = (): boolean => this.formUtils.isFieldInvalid(this.form, this.controlName);

  public showCSVstatus = (errors: ReadonlyArray<ParseError>): void => {
    this.onUploadFile.emit(this.addedItemsList);

    if (this.areCSVErrorOccurs(this.uploadedFilesLength, errors)) {
      this.isError = true;
      this.showCsvUploaderError({ 'CSV_UPLOADER.ERROR.INVALID_FILE': true });
      this.logger.warn(`File format is incorrect`, errors);
    } else if (this.areInvitationsExceedValidLimit()) {
      this.isError = true;
      this.showCsvUploaderError({ 'CSV_UPLOADER.ERROR.MAX_LENGTH_BEEN_REACHED': true });
      this.addedItemsList = [];
    } else {
      this.addedItemsList = [];
      this.isError = false;
      this.hasRecords = this.uploadedFilesLength === 0;
      this.resetErrors();
    }
  };

  public onFileLoaded(csv: ReadonlyArray<string>): void {
    const emailsOrMsisdns = csv
      .reduce((a, b) => a.concat(b), [] as ReadonlyArray<string>)
      .filter(str => str.length > 0)
      .map(str => str.replace(/\s/g, ''));

    this.uploadedFilesLength = 0;
    this.incorrectInvitations = 0;

    emailsOrMsisdns.forEach(
      (emailOrMsisdn): void => {
        if (this.isValueExist(emailOrMsisdn) || this.isValueExist(this.getFullPhoneNumber(emailOrMsisdn))) {
          this.incorrectInvitations++;
        }

        if (this.isEmail(emailOrMsisdn)) {
          this.addCsvContact(emailOrMsisdn);
        } else {
          const arrayNumber = this.getFullPhoneNumber(emailOrMsisdn);
          if (this.isMsisdn(arrayNumber)) {
            this.addCsvContact(arrayNumber);
          }
        }
      },
    );
  }

  public showValidationAlert = (): string => {
    const controlErrors = this.form.controls[this.controlName].errors;
    if (controlErrors !== null) {
      const errorCode = Object.keys(controlErrors)[0];

      return Object.keys(this.errorsMsg).includes(errorCode) ? this.errorsMsg[errorCode].text : errorCode;
    } else {
      return '';
    }
  };

  private addCsvContact = (value: string): void => {
    this.uploadedFilesLength += 1;
    this.addedItemsList = [...this.addedItemsList, value];
  };

  private isEmail = (emailOrMsisdn: string): boolean =>
    this.isEmailValid(emailOrMsisdn) && this.mailPattern.test(emailOrMsisdn);

  private isEmailValid = (emailOrMsisdn: string): boolean =>
    this.addedItemsList.indexOf(emailOrMsisdn) === -1 &&
    !this.isValueExist(emailOrMsisdn) &&
    !this.areInvitationsExceedValidLimit();

  private isMsisdn = (arrayNumber: string): boolean => isValidNumber(arrayNumber) && this.isMsisdnValid(arrayNumber);

  private isMsisdnValid = (arrayNumber: string): boolean =>
    this.addedItemsList.indexOf(arrayNumber) === -1 &&
    !this.isValueExist(arrayNumber) &&
    !this.areInvitationsExceedValidLimit();

  private isValueExist = (value: string): boolean =>
    this.addedItems.filter(item => item.replace(/ /g, '').replace(/-/g, '') === value).length > 0;

  private getFullPhoneNumber = (inputValue: string): string =>
    this.phoneNumberUnifyService.unifyPhoneNumber(inputValue);

  private areInvitationsExceedValidLimit = (): boolean =>
    this.addedItemsList.length + this.invitedEmployeeLength >= this.consultationInvitationsMaxCount;

  private assignValidationValues = (): void => {
    this.consultationInvitationsMaxCount = Config.inputsLengthNumbers.consultationInvitationsMaxCount;
    this.mailPattern = Config.patterns.emailPattern;
  };

  private areCSVErrorOccurs = (loadedNumber: number, errors: ReadonlyArray<ParseError>): boolean =>
    errors.length > 0 && loadedNumber === 0;

  private showCsvUploaderError = (errorObject: { [key: string]: boolean }): void => {
    this.form.controls[this.controlName].setErrors(errorObject);
    this.formUtils.isFieldInvalid(this.form, this.controlName);
  };

  private resetErrors = (): void => {
    this.form.controls[this.controlName].setErrors(null);
  };
}
