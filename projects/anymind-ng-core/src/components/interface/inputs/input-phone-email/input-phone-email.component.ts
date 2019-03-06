import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PhoneNumberService } from './phone-number.service';
import { COMPONENTS_CONFIG } from '../../../../shared/injection-tokens/injection-tokens';
import { Config } from '../../../../config';

export interface IValidatorsErrorMsg {
  [key: string]: {
    code: string;
    text: string;
  };
}

export interface IInputPhoneEmailValueObject {
  msisdn?: string;
  email?: string;
}

@Component({
  selector: 'am-core-input-phone-email',
  templateUrl: './input-phone-email.component.html',
  styleUrls: ['./input-phone-email.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PhoneNumberService],
})
export class InputPhoneEmailComponent implements OnInit {
  @Input()
  public isDisabled = false;

  @Input()
  public isInitiallyFocused = false;

  @Input()
  public inputFormControl: FormControl;

  @Input()
  public label = '';

  @Input()
  public placeholder = '';

  @Input()
  public isRequired = false;

  @Output()
  public inputValueChange = new EventEmitter<IInputPhoneEmailValueObject>();

  public isFocused = this.isInitiallyFocused;

  // this pattern allows digits, characters: -()+
  private readonly onlyPhoneNumberCharactersPattern = new RegExp(
    '^([^!@#$%^&*_{}\\[\\]|\\\\"\':;?></.,=a-zA-Z]|\\d+)+$',
  );

  private readonly errorsMsg: IValidatorsErrorMsg = {
    pattern: {
      code: 'pattern',
      text: 'VALIDATOR.ERROR.PATTERN',
    },
    email: {
      code: 'email',
      text: 'VALIDATOR.ERROR.PATTERN',
    },
    required: {
      code: 'required',
      text: 'INPUT.REQUIRED_VALIDATION_ERROR',
    },
  };

  constructor(@Inject(COMPONENTS_CONFIG) private config: Config, private phoneNumberService: PhoneNumberService) {}

  public ngOnInit(): void {
    this.inputFormControl.setValidators(this.createValidator());
    this.inputFormControl.valueChanges.subscribe(value => {
      if (this.inputFormControl.valid) {
        this.inputValueChange.emit(this.phoneNumberService.getInputValueObject(value));
      }
    });
  }

  public onFocus(): void {
    this.isFocused = true;
  }

  public onBlur(): void {
    this.isFocused = false;
  }

  public getValidationAlert(): string {
    const controlErrors = this.inputFormControl.errors;
    if (controlErrors !== null) {
      const errorCode = Object.keys(controlErrors)[0];

      return this.errorsMsg[errorCode] ? this.errorsMsg[errorCode].text : errorCode;
    } else {
      return '';
    }
  }

  private createValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      /** it is fine to do coercion here, because '', null, undefined is evaluated to false */
      if (this.isRequired && !value) {
        return Validators.required(control);
      }

      if (this.isNotEmail(value)) {
        if (!this.phoneNumberService.isPhoneNumberValid(value)) {
          return { [this.errorsMsg.pattern.code]: this.errorsMsg.pattern.text };
        }

        // tslint:disable-next-line:no-null-keyword
        return null;
      }

      return Validators.pattern(this.config.validation.email.regex);
    };
  }

  private isNotEmail(value: string): boolean {
    return this.onlyPhoneNumberCharactersPattern.test(value);
  }
}
