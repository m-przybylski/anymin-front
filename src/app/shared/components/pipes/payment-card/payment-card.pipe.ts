import { Pipe, PipeTransform } from '@angular/core';
import { DefaultCreditCard } from '@anymind-ng/api';

@Pipe({
  name: 'creditCard',
})
export class CreditCardPipe implements PipeTransform {
  public transform(value: DefaultCreditCard | undefined): string {
    if (!(value && value.card)) {
      return '';
    }

    return `${value.card.cardType} ${value.card.maskedNumber}`;
  }
}
