import { Pipe, PipeTransform } from '@angular/core';
import { MoneyDto } from '@anymind-ng/api';
import { LoggerService } from '../../../services/logger.service';

@Pipe({ name: 'moneyToCurrency' })
export class MoneyToCurrency implements PipeTransform {
  constructor(private logger: LoggerService) {}

  public transform(money?: MoneyDto): string {
    if (typeof money !== 'object' || !money.hasOwnProperty('value') || !money.hasOwnProperty('currency')) {
      this.logger.warn('Expected MoneyDto, got ', money);

      return '';
    }

    return money.currency;
  }
}
