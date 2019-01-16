import { Injectable } from '@angular/core';
import { formatNumber, CountryCode } from 'libphonenumber-js';

@Injectable()
export class PhoneNumberUnifyService {
  private country: CountryCode = 'PL';
  private prefixNumber = '48';
  private prefix = '+48';

  public unifyPhoneNumber(phoneNumber: string): string {
    return this.getPrefixPhoneNumber(this.getNumberWithoutPrefix(this.deleteIncorrectPhoneSigns(phoneNumber)));
  }

  public getPrettyPhoneNumber(phoneNumber: string): string {
    return this.makePrettyPhoneNumber(this.getNumberWithoutPrefix(this.deleteIncorrectPhoneSigns(phoneNumber)));
  }

  public getNumberWithoutPrefix(phonenumber: string): string {
    // tslint:disable:no-magic-numbers
    const twoIndexes = 2;
    const threeIndexes = 3;
    const fourIndexes = 4;

    if (phonenumber.startsWith(this.prefixNumber)) {
      return phonenumber.substr(twoIndexes);
    } else if (phonenumber.startsWith(`00${this.prefixNumber}`)) {
      return phonenumber.substr(fourIndexes);
    } else if (phonenumber.startsWith(`+${this.prefixNumber}`)) {
      return phonenumber.substr(threeIndexes);
    } else {
      return phonenumber;
    }
  }

  private getPrefixPhoneNumber(phoneNumber: string): string {
    return `${this.prefix}${phoneNumber}`;
  }

  private makePrettyPhoneNumber(phoneNumber: string): string {
    return `${this.prefix} ${this.formatPhoneNumber(phoneNumber)}`;
  }

  private formatPhoneNumber(phoneNumber: string): string {
    return formatNumber(phoneNumber, this.country, 'National');
  }

  private deleteIncorrectPhoneSigns(value: string): string {
    return value.replace(/ /g, '').replace(/-/g, '');
  }
}
