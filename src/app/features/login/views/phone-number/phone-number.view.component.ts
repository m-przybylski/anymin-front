import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PhoneNumberServiceStatus, PhoneNumberViewService } from './phone-number.view.service';
import { FormUtilsService, InputPhoneNumberService } from '@anymind-ng/components';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  CommonSettingsService
} from '../../../../../angularjs/common/services/common-settings/common-settings.service';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './phone-number.view.component.html',
  styleUrls: ['./phone-number.view.component.sass'],
  providers: [CommonSettingsService]
})

export class PhoneNumberViewComponent implements OnInit, AfterContentInit, OnDestroy {

  public readonly msisdnFormId = 'msisdnForm';
  public readonly msisdnControlName = 'msisdn';

  public msisdnForm: FormGroup;
  public msisdnPrefix: string = this.CommonSettingsService.localSettings.countryCodes[0];
  public isRequestPending = false;
  public isInputInitialFocused = true;
  public isInputRequired = true;

  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private loginService: PhoneNumberViewService,
              private formUtils: FormUtilsService,
              private CommonSettingsService: CommonSettingsService,
              private inputPhoneNumber: InputPhoneNumberService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('PhoneNumberViewComponent');
  }

  public ngOnInit(): void {
    this.msisdnForm = new FormGroup({
      [this.msisdnControlName]: new FormControl()
    });
  }

  public ngAfterContentInit(): void {
    const invitePhoneNumber = this.loginService.getPhoneNumberFromInvitation();

    this.msisdnForm.controls[this.msisdnControlName].setValidators(
      this.inputPhoneNumber.getValidators(this.msisdnPrefix, this.isInputRequired));

    if (invitePhoneNumber) {
      this.msisdnForm.setValue({
        [this.msisdnControlName]: invitePhoneNumber
      });
    }
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onFormSubmit = (msisdnForm: FormGroup): void => {
    if (msisdnForm.valid) {
      this.isRequestPending = true;
      const phoneNumber = this.msisdnPrefix.concat(msisdnForm.value[this.msisdnControlName].toString());
      this.loginService.handlePhoneNumber(phoneNumber)
        .pipe(finalize(() => this.isRequestPending = false))
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(this.handleRegistrationStatus);
    } else {
      this.formUtils.validateAllFormFields(msisdnForm);
    }
  }

  private handleRegistrationStatus = (status: PhoneNumberServiceStatus): void => {
    switch (status) {
      case PhoneNumberServiceStatus.MSISDN_INVALID:
        this.displayIncorrectMsisdnError();
        break;

      case PhoneNumberServiceStatus.SUCCESS:
        this.logger.warn('Msisdn handled properly (success)');
        break;

      case PhoneNumberServiceStatus.ERROR:
        this.logger.warn('Msisdn handled properly (error)');
        break;

      default:
        this.logger.error('Unhandled phone number registration status', status);
    }
  }

  private displayIncorrectMsisdnError = (): void => {
    this.msisdnForm.controls[this.msisdnControlName].setErrors({[PhoneNumberServiceStatus.MSISDN_INVALID]: true});
    this.formUtils.validateAllFormFields(this.msisdnForm);
  }
}
