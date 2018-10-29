import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PhoneNumberViewService } from './phone-number.view.service';
import {
  FormUtilsService,
  InputPhoneNumberService,
  LoggerFactory,
  inputPhoneNumberErrorMessages,
} from '@anymind-ng/core';
import { finalize, catchError } from 'rxjs/operators';
import { CommonSettingsService } from '../../../../../angularjs/common/services/common-settings/common-settings.service';
import { Logger } from '@platform/core/logger';
import { EMPTY } from 'rxjs';

@Component({
  templateUrl: './phone-number.view.component.html',
  styleUrls: ['./phone-number.view.component.sass'],
  providers: [CommonSettingsService],
})
export class PhoneNumberViewComponent extends Logger implements OnInit {
  public readonly msisdnFormId = 'msisdnForm';
  public readonly msisdnControlName = 'msisdn';

  public msisdnForm: FormGroup;
  public msisdnPrefix: string = this.commonSettingsService.localSettings.countryCodes[0];
  public isRequestPending = false;
  public isInputInitialFocused = true;
  public isInputRequired = true;

  private msisdnFormControl: FormControl;

  constructor(
    private loginService: PhoneNumberViewService,
    private formUtils: FormUtilsService,
    private commonSettingsService: CommonSettingsService,
    private inputPhoneNumber: InputPhoneNumberService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('PhoneNumberViewComponent'));
  }

  public ngOnInit(): void {
    const invitePhoneNumber = this.loginService.getPhoneNumberFromInvitation();
    this.msisdnFormControl = new FormControl(
      invitePhoneNumber ? invitePhoneNumber : '',
      this.inputPhoneNumber.getValidators(this.msisdnPrefix, this.isInputRequired),
    );
    this.msisdnForm = new FormGroup({
      [this.msisdnControlName]: this.msisdnFormControl,
    });
  }

  public onFormSubmit = (msisdnForm: FormGroup): void => {
    if (msisdnForm.valid) {
      this.isRequestPending = true;
      const phoneNumber = this.msisdnPrefix.concat(msisdnForm.value[this.msisdnControlName].toString());
      this.loginService
        .handlePhoneNumber(phoneNumber)
        .pipe(
          finalize(() => (this.isRequestPending = false)),
          catchError(() => {
            this.displayIncorrectMsisdnError();

            return EMPTY;
          }),
        )
        .subscribe();
    } else {
      this.formUtils.validateAllFormFields(msisdnForm);
    }
  };

  private displayIncorrectMsisdnError = (): void => {
    this.msisdnForm.controls[this.msisdnControlName].setErrors({ [inputPhoneNumberErrorMessages.invalid]: true });
    this.formUtils.validateAllFormFields(this.msisdnForm);
  };
}
