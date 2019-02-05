// tslint:disable
import { Inject, Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { Config } from '../../config';
import { COMPONENTS_CONFIG } from '../../shared/injection-tokens/injection-tokens';
import { inputPhoneNumberErrorMessages } from '../../components/interface/inputs/input-phone-number/input-phone-number.component';
import * as phonenumbers from 'libphonenumber-js';

@Injectable({ providedIn: 'root' })
export class InputPhoneNumberService {
  constructor(@Inject(COMPONENTS_CONFIG) private config: Config) {}

  public isValidPhoneNumber = (prefix: string, phoneNumber: string): boolean => {
    if (prefix.length > 0 && phoneNumber.length > 0) {
      const fullPhoneNumber = prefix + phoneNumber;
      const parsed = phonenumbers.parse(fullPhoneNumber);

      return phonenumbers.isValidNumber(parsed);
    }

    return false;
  };

  public getMsisdnValidator = (msisdnPrefix: string): ((control: AbstractControl) => { [key: string]: any } | null) => (
    control: AbstractControl,
  ): { [key: string]: any } | null => {
    const msisdn = String(control.value);
    const err = { [inputPhoneNumberErrorMessages.invalid]: true };

    if (msisdn.length >= this.config.inputsMinLength.msisdn) {
      return this.isValidPhoneNumber(msisdnPrefix, msisdn || '') ? null : err;
    } else if (msisdn === 'null' || msisdn.length === 0) {
      return null;
    } else {
      return err;
    }
  };

  public getValidators = (msisdnPrefix: string, isRequired: boolean): ValidatorFn[] => {
    const inputValidators: ValidatorFn[] = [this.getMsisdnValidator(msisdnPrefix)];
    if (isRequired) {
      inputValidators.push(Validators.required);
    }

    return inputValidators;
  };
}
