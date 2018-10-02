import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as IBAN from 'iban';

// tslint:disable-next-line
export function ibanNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const input = `PL${control.value}`;

    // tslint:disable-next-line:no-null-keyword
    return IBAN.isValid(input) ? null : { invalid: true };
  };
}
