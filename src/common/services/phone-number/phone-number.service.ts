namespace profitelo.services.phoneNumber {

  export interface PhoneNumber {}

  export interface IPhoneNumberService {
    parse(text: string): PhoneNumber
    isValidNumber(phoneNumber: PhoneNumber): boolean
  }

  function PhoneNumberService(phonenumbers) {
    return phonenumbers.PhoneNumberUtil.getInstance()
  }

  angular.module('profitelo.services.phone-number', [
    'phonenumbers'
  ])
  .service('phoneNumberService', PhoneNumberService)
}