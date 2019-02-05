import { Pipe, PipeTransform } from '@angular/core';
import { MoneyDto } from '@anymind-ng/api';
import { LoggerService } from '../../../services/logger.service';

@Pipe({ name: 'moneyToAmount' })
export class MoneyToAmount implements PipeTransform {
  private static readonly minorToMajorMultiplier: number = 100;
  private static readonly decimalSystemBase: number = 10;

  constructor(private logger: LoggerService) {}

  public transform(money?: MoneyDto): string {
    if (typeof money !== 'object' || !money.hasOwnProperty('value') || !money.hasOwnProperty('currency')) {
      this.logger.warn('Expected MoneyDto, got ', money);

      return '';
    }

    return MoneyToAmount.handleAmount(money.value);
  }

  // tslint:disable:no-bitwise
  // tslint:disable:no-let
  private static handleAmount(_amount: number): string {
    let sign = '';
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    const amount = parseInt(<any>_amount, MoneyToAmount.decimalSystemBase);
    const major = amount ? (amount / MoneyToAmount.minorToMajorMultiplier) | 0 : 0;
    const minor = amount ? amount % MoneyToAmount.minorToMajorMultiplier : 0;
    const minorFirst = minor ? minor % MoneyToAmount.decimalSystemBase : 0;
    const minorSecond = minor ? (minor / MoneyToAmount.decimalSystemBase) | 0 : 0;

    if (_amount < 0) {
      sign = '-';
    }

    return `${sign + Math.abs(major).toString()},${Math.abs(minorSecond).toString() + Math.abs(minorFirst).toString()}`;
  }
}
