import { Pipe, PipeTransform } from '@angular/core';
import { MoneyDto } from '@anymind-ng/api';
import { MoneyToAmount } from '../money-to-amount/money-to-amount.pipe';
import { MoneyToCurrency } from '../money-to-currency/money-to-currency.pipe';
import { LoggerService } from '../../../services/logger.service';

@Pipe({ name: 'moneyToString' })
export class MoneyToString implements PipeTransform {
  private moneyToAmount: MoneyToAmount;
  private moneyToCurrency: MoneyToCurrency;

  constructor(private logger: LoggerService) {
    this.moneyToAmount = new MoneyToAmount(this.logger);
    this.moneyToCurrency = new MoneyToCurrency(this.logger);
  }

  public transform(money?: MoneyDto): string {
    if (typeof money !== 'object' || !money.hasOwnProperty('value') || !money.hasOwnProperty('currency')) {
      this.logger.warn('Expected MoneyDto, got ', money);

      return '';
    }

    return this.handleMoney(money);
  }

  private handleMoney = (money: MoneyDto): string =>
    `${this.moneyToAmount.transform(money)} ${this.moneyToCurrency.transform(money)}`;
}
