import { Pipe, PipeTransform } from '@angular/core';
import { Config } from '../../../../../config';

@Pipe({
  name: 'moneyDivider',
})
export class MoneyDividerPipe implements PipeTransform {
  private readonly moneyDivider = Config.moneyDivider;

  public transform(money: number): number {
    return money / this.moneyDivider;
  }
}
