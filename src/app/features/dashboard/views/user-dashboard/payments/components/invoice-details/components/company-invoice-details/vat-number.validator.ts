// tslint:disable:no-null-keyword
// tslint:disable:no-magic-numbers
// tslint:disable:only-arrow-functions
// tslint:disable:triple-equals

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function vatNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { invalidVatNumber: true } | null => {
    const vatNumber = control.value.replace(/\-/g, '');

    if (vatNumber == null && vatNumber === '') {
      return { invalidVatNumber: true };
    }

    if (vatNumber.length !== 10) {
      return { invalidVatNumber: true };
    }

    if (vatNumber.split('').every((digit: number) => Number.isNaN(digit))) {
      return { invalidVatNumber: true };
    }

    if (vatNumber[9] != getVatNumberChecksum(vatNumber)) {
      return { invalidVatNumber: true };
    }

    return null;
  };
}

function getVatNumberChecksum(vatNumber: string): number {
  return (
    (Number(vatNumber[0]) * 6 +
      Number(vatNumber[1]) * 5 +
      Number(vatNumber[2]) * 7 +
      Number(vatNumber[3]) * 2 +
      Number(vatNumber[4]) * 3 +
      Number(vatNumber[5]) * 4 +
      Number(vatNumber[6]) * 5 +
      Number(vatNumber[7]) * 6 +
      Number(vatNumber[8]) * 7) %
    11
  );
}
