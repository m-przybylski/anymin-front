import { Pipe, PipeTransform } from '@angular/core';
import { GetDefaultPaymentMethod } from '@anymind-ng/api';

@Pipe({
  name: 'creditCard',
})
export class CreditCardPipe implements PipeTransform {
  public transform(value: GetDefaultPaymentMethod | undefined): string {
    // TODO FIX_NEW_FINANCE_MODEL
    if (value && value.creditCardId) {
      return `${value.creditCardId} ${value.creditCardId}`;
    }

    return '';
  }
}
