import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';
import { Config } from '../../../../config';
import { COMPONENTS_CONFIG } from '../../../../shared/injection-tokens/injection-tokens';

export interface IValidationErrorMessages {
  [key: string]: string;
}

export const inputPhoneNumberErrorMessages: IValidationErrorMessages = {
  invalid: 'INPUT_PHONE_NUMBER.INCORRECT_PHONE_NUMBER_VALIDATION_ERROR',
  required: 'INPUT.REQUIRED_VALIDATION_ERROR',
  blocked: 'INPUT_PHONE_NUMBER.BLOCKED_PHONE_NUMBER_ERROR',
  attemptsExceeded: 'INPUT_PHONE_NUMBER.ATTEMPTS_EXCEEDED_PHONE_NUMBER_ERROR',
  alreadyExists: 'INPUT_PHONE_NUMBER.ALREADY_EXISTS_PHONE_NUMBER_ERROR',
};

@Component({
  selector: 'am-core-input-phone-number',
  templateUrl: './input-phone-number.component.html',
  styleUrls: ['./input-phone-number.component.sass'],
})
export class InputPhoneNumberComponent implements OnInit {
  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input()
  public controlName: string;

  @Input()
  public isDisabled?: boolean;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public initialFocus = false;

  @Input()
  public isRequired = false;

  public isFocused = false;
  public inputMask = this.config.inputMasks.phoneNumberMask;

  constructor(@Inject(COMPONENTS_CONFIG) private config: Config, public formUtils: FormUtilsService) {}

  public ngOnInit(): void {
    this.formGroup.addControl(this.controlName, new FormControl('', [Validators.required]));
  }

  public getValidationTrKey(): string {
    if (this.isControlValueInvalid()) {
      const errorCode = Object.keys(this.formGroup.controls[this.controlName].errors || {})[0];

      return Object.keys(inputPhoneNumberErrorMessages).indexOf(errorCode) !== -1
        ? inputPhoneNumberErrorMessages[errorCode]
        : errorCode;
    }
    if (this.isControlRequiredError()) {
      return inputPhoneNumberErrorMessages.required;
    }

    return '';
  }

  public isFieldInvalid(): boolean {
    return this.formUtils.isFieldInvalid(this.formGroup, this.controlName);
  }

  public onFocus(): void {
    this.isFocused = true;
  }

  public onBlur(): void {
    this.isFocused = false;
  }

  private isControlValueInvalid(): boolean {
    return (
      this.formGroup.controls[this.controlName].errors !== null &&
      this.formGroup.controls[this.controlName].value &&
      this.formGroup.controls[this.controlName].value.length > 0 &&
      this.isFieldInvalid()
    );
  }

  private isControlRequiredError(): boolean {
    return (
      this.isFieldInvalid() &&
      this.formGroup.controls[this.controlName].errors === null &&
      (this.formGroup.controls[this.controlName].errors as ValidationErrors).required
    );
  }
}
