import { Injectable } from '@angular/core';

@Injectable()
export class LoginHelperService {
  /**
   * Function removes + from the beggining of phone number
   * it also validates if plus exists
   *
   * @param phoneNumber: phone number as string it may starts with +
   *
   * @returns phone number without +
   */
  public trimPhoneNumber = (phoneNumber: string): string =>
    phoneNumber.startsWith('+') ? phoneNumber.slice(1) : phoneNumber;

  /**
   * Function adds plus to the phone number
   * it also validats if plus already exists
   *
   * @param phoneNumber: phone number as string with or without +
   *
   * @returns phone number with + at the begining
   */
  public addPlusToPhoneNumber = (phoneNumber: string): string =>
    phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
}
