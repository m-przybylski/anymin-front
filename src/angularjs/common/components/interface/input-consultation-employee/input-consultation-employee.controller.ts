// tslint:disable:no-let
// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
// tslint:disable:no-var-requires
// tslint:disable:no-shadowed-variable
// tslint:disable:no-require-imports
// tslint:disable:newline-before-return
// tslint:disable:curly
import { IInputConsultationEmployeeBindings } from './input-consultation-employee';
import { CommonSettingsService } from '../../../services/common-settings/common-settings.service';
import { UserService } from '../../../services/user/user.service';
import { LoggerService } from '@anymind-ng/core';
import { ParseResult, ParseError } from 'papaparse';
// tslint:disable-next-line
import { flatten } from 'lodash';
import { ModalsService } from '../../../services/modals/modals.service';

const Papa = require('papaparse');
const phoneNumbers = require('libphonenumber-js');

// tslint:disable:member-ordering
export class InputConsultationEmployeeComponentController implements IInputConsultationEmployeeBindings {
  public addedItemsList: string[] = [];
  public inputValue: string;
  public isOwnerEmployee: boolean;
  public isDirty = false;
  public isInputValueInvalid = false;
  public isUploadFileIsInvalid = false;
  public areUploadedFilesInvalid = false;
  private mailRegexp: RegExp;
  private phonePattern: RegExp;
  public isFocus = false;
  public isValidEmployee = false;
  public isSubmitted = false;
  public isCheckboxVisible = true;
  public isMaxConsultationCountError = false;

  private static readonly defaultCountryPrefix = '+48';
  private consultationInvitationsMaxCount: number;
  private userEmail?: string;
  private userPhoneNumber?: string;
  public static $inject = ['CommonSettingsService', 'userService', 'modalsService', 'logger'];

  constructor(private CommonSettingsService: CommonSettingsService,
              private userService: UserService,
              private modalsService: ModalsService,
              private logger: LoggerService) {
    this.assignValidationValues();
  }

  public $onInit(): void {
    this.userService.getUser().then(account => {
      this.userEmail = account.email;
      this.userPhoneNumber = account.msisdn;
    }, (error) => {
      this.logger.error(error);
    });
  }

  public onChange = (): void => {
    this.isValidEmployee = false;
    this.isInputValueInvalid = false;
  }

  private getPrefixPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber.indexOf(InputConsultationEmployeeComponentController.defaultCountryPrefix) !== -1) {
      return phoneNumber.replace(InputConsultationEmployeeComponentController.defaultCountryPrefix,
        InputConsultationEmployeeComponentController.defaultCountryPrefix + ' ');
    } else {
      return InputConsultationEmployeeComponentController.defaultCountryPrefix + ' ' + phoneNumber;
    }
  }

  private deleteIncorrectPhoneSigns = (inputValue: string): string =>
    inputValue.replace(/ /g, '').replace(/-/g, '')

  private isValidPhoneNumber = (inputValue: string): boolean =>
    inputValue.length > 0 && this.phonePattern.test(inputValue)

  private isValidEmailAddress = (inputValue?: string): boolean =>
    inputValue && inputValue.length > 0 ? this.mailRegexp.test(inputValue) : false

  public isEmployeeExist = (inputValue?: string): boolean =>
    inputValue ? this.addedItemsList.indexOf(inputValue) !== -1 : false

  // tslint:disable-next-line:cyclomatic-complexity
  public onEnter = (inputValue?: string): void => {
    this.isValidEmployee = this.isEmployeeExist(inputValue);

    if (inputValue && phoneNumbers.isValidNumber(inputValue, 'PL') && !this.isPhoneNumberBelongsToUser(inputValue)) {
      const correctValue = this.getFullPhoneNumber(inputValue);
      if (this.isValidPhoneNumber(correctValue) && !this.isMaxInvitationsCountReached())
        this.addEmployee(correctValue);
    }
    else if (inputValue && this.isValidEmailAddress(inputValue) && !this.isMaxInvitationsCountReached()
      && !this.isEmailBelongsToUser(inputValue)) {
      this.addEmployee(inputValue);
    }
    else if (this.isMaxInvitationsCountReached()) {
      this.isMaxConsultationCountError = true;
    }
    else {
      this.isInputValueInvalid = true;
      this.isValidEmployee = false;
    }
  }

  private addEmployee = (contactValue: string): void => {
    if (!this.isEmployeeExist(contactValue)) {
      this.addedItemsList.push(contactValue);
      this.inputValue = '';
      this.isValidEmployee = false;
    } else {
      this.isValidEmployee = true;
    }
    this.isInputValueInvalid = false;
  }

  private getFullPhoneNumber = (inputValue: string): string =>
    this.getPrefixPhoneNumber(this.deleteIncorrectPhoneSigns(inputValue))

  public deleteSelectedItem = (index: number): void => {
    this.addedItemsList.splice(index, 1);
    this.isMaxConsultationCountError = this.areInvitationsExceedValidLimit();
  }

  public onFocus = (): void => {
    this.isFocus = true;
  }

  public onBlur = (): void => {
    this.isDirty = true;
    this.isFocus = false;
    this.isInputValueInvalid = false;
    this.isValidEmployee = false;
    this.isMaxConsultationCountError = false;
  }

  public uploadCSVFile = (files: FileList): void => {
    const file = files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result: ParseResult): void => {
          const loadedNumber = this.onLoadFile(result.data);
          this.showCSVstatus(loadedNumber, result.errors);
        }
      });
    } else {
      this.logger.error('InputConsultationEmployeeComponentController: csv upload - file is undefined');
    }
  }

  private showCSVstatus = (loadedNumber: number, errors: ParseError[]): void => {
    this.modalsService.createInfoAlertModal(`Liczba załadowanych rekordów: ${loadedNumber}`, () => {
      if (errors.length > 0 && loadedNumber === 0) {
        this.modalsService.createInfoAlertModal('Błąd! Format pliku jest niepoprawny');
      }
    });
  }

  private isEmailBelongsToUser = (email: string): boolean => this.userEmail === email;

  private isPhoneNumberBelongsToUser = (phoneNumber: string): boolean =>
    this.userPhoneNumber === InputConsultationEmployeeComponentController.defaultCountryPrefix + phoneNumber

  private onLoadFile = (csv: string[][]): number => {
    const emailsOrMsisdns = flatten(csv).filter(str => str.length > 0).map(str => str.replace(/\s/g, ''));
    this.logger.debug(emailsOrMsisdns);

    let loadedCount = 0;
    emailsOrMsisdns.forEach((emailOrMsisdn) => {

      if (this.addedItemsList.indexOf(emailOrMsisdn) === -1 && this.mailRegexp.test(emailOrMsisdn)) {
        this.logger.debug(`Recognized ${emailOrMsisdn} as email`);
        loadedCount += 1;
        this.addedItemsList.push(emailOrMsisdn);
      } else {
        try {
          const maybeMsisdn = this.getNumberWithoutPolishPrefix(emailOrMsisdn);
          const arrayNumber = this.getFullPhoneNumber(maybeMsisdn);
          if (phoneNumbers.isValidNumber(maybeMsisdn, 'PL') && this.addedItemsList.indexOf(arrayNumber) === -1) {
            loadedCount += 1;
            this.addedItemsList.push(arrayNumber);
          }
        } catch (e) {
            this.logger.debug(`Not recognized ${emailOrMsisdn}`);
        }
      }
    });

    this.isMaxConsultationCountError = this.areInvitationsExceedValidLimit();
    return loadedCount;
  }

  private getNumberWithoutPolishPrefix = (phonenumber: string): string => {
    // tslint:disable:no-magic-numbers
    if (phonenumber.startsWith('48')) {
      return phonenumber.substr(2);
    } else if (phonenumber.startsWith('0048')) {
      return phonenumber.substr(4);
    } else if (phonenumber.startsWith('+48')) {
      return phonenumber.substr(3);
    } else {
      return phonenumber;
    }
  }

  private isMaxInvitationsCountReached = (): boolean =>
    this.addedItemsList.length >= this.consultationInvitationsMaxCount

  private areInvitationsExceedValidLimit = (): boolean =>
    this.addedItemsList.length > this.consultationInvitationsMaxCount

  private assignValidationValues = (): void => {
    const localSettings = this.CommonSettingsService.localSettings;
    this.consultationInvitationsMaxCount = localSettings.consultationInvitationsMaxCount;
    this.mailRegexp = localSettings.emailPattern;
    this.phonePattern = localSettings.phonePattern;
  }
}
