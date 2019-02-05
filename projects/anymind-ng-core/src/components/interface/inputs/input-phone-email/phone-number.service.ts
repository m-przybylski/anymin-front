import { Inject, Injectable } from '@angular/core';
import { COMPONENTS_CONFIG } from '../../../../shared/injection-tokens/injection-tokens';
import { Config } from '../../../../config';
import { IInputPhoneEmailValueObject } from './input-phone-email.component';

@Injectable()
export class PhoneNumberService {
  private readonly phoneNumberRegex = new RegExp('^\\d{9}$');
  private emailRegex = new RegExp(this.config.validation.email.regex);
  private prefixNumber = '48';
  private polishPrefix = '+48';

  constructor(@Inject(COMPONENTS_CONFIG) private config: Config) {}

  public isPhoneNumberValid(phoneNumber: string): boolean {
    return this.phoneNumberRegex.test(this.unifyPhoneNumber(phoneNumber));
  }

  public getInputValueObject(value: string): IInputPhoneEmailValueObject {
    if (this.isEmail(value)) {
      return { email: value };
    }

    return { msisdn: this.polishPrefix.concat(this.unifyPhoneNumber(value)) };
  }

  private getNumberWithoutPrefix = (phoneNumber: string): string => {
    const twoIndexes = 2;
    const threeIndexes = 3;
    const fourIndexes = 4;

    if (phoneNumber.startsWith(this.prefixNumber)) {
      return phoneNumber.substr(twoIndexes);
    } else if (phoneNumber.startsWith(`00${this.prefixNumber}`)) {
      return phoneNumber.substr(fourIndexes);
    } else if (phoneNumber.startsWith(`+${this.prefixNumber}`)) {
      return phoneNumber.substr(threeIndexes);
    } else {
      return phoneNumber;
    }
  };

  private unifyPhoneNumber = (phoneNumber: string): string =>
    this.getNumberWithoutPrefix(this.deleteIncorrectPhoneSigns(phoneNumber));

  private deleteIncorrectPhoneSigns = (value: string): string => value.replace(/ /g, '').replace(/-/g, '');

  private isEmail(value: string): boolean {
    return this.emailRegex.test(value);
  }
}
