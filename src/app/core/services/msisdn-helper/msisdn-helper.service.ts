import { Injectable } from '@angular/core';

@Injectable()
export class MsisdnHelperService {
  /**
   * Function removes + from the beggining of phone number
   * it also validates if plus exists
   *
   * @param phoneNumber: phone number as string it may starts with +
   *
   * @returns phone number without +
   */
  public trimPhoneNumber(phoneNumber: string): string {
    return phoneNumber.startsWith('+') ? phoneNumber.slice(1) : phoneNumber;
  }

  /**
   * Function adds plus to the phone number
   * it also validats if plus already exists
   *
   * @param phoneNumber: phone number as string with or without +
   *
   * @returns phone number with + at the begining
   */
  public addPlusToPhoneNumber(phoneNumber: string): string {
    return phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
  }

  /**
   * Function removes prefix from phone number
   *
   * @param phoneNumber: phone number as string with prefix e.g. +48
   *
   * @returns phone number without prefix
   */
  public getPhoneNumberWithoutPrefix(phoneNumber: string): string {
    const prefixLength = 3;

    return phoneNumber.slice(prefixLength);
  }
}
