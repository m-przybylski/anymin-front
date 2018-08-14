import { Injectable } from '@angular/core';
import { formatNumber, CountryCode } from 'libphonenumber-js';

@Injectable()
export class PhoneNumberUnifyService {

  private country: CountryCode = 'PL';
  private prefixNumber = '48';
  private prefix = '+48';

  public unifyPhoneNumber = (phoneNumber: string): string =>
    this.getPrefixPhoneNumber(this.getNumberWithoutPrefix(this.deleteIncorrectPhoneSigns(phoneNumber)))

  public getPrettyPhoneNumber = (phoneNumber: string): string =>
    this.makePreatyPhoneNumber(this.getNumberWithoutPrefix(this.deleteIncorrectPhoneSigns(phoneNumber)))

  private getNumberWithoutPrefix = (phonenumber: string): string => {
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

  private getPrefixPhoneNumber = (phoneNumber: string): string =>
    `${this.prefix}${phoneNumber}`

  private makePreatyPhoneNumber = (phoneNumber: string): string =>
    `${this.prefix} ${this.formatPhoneNumber(phoneNumber)}`

  private formatPhoneNumber = (phoneNumber: string): string => formatNumber(phoneNumber, this.country, 'National');

  private deleteIncorrectPhoneSigns = (value: string): string =>
    value.replace(/ /g, '').replace(/-/g, '')
}
