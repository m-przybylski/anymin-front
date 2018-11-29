import { Component, Input } from '@angular/core';
import { MoneyDto } from '@anymind-ng/api';

@Component({
  selector: 'plat-money-display',
  templateUrl: './money-display.component.html',
})
export class MoneyDisplayComponent {
  @Input()
  public set money(value: MoneyDto) {
    this._money = value;
  }

  @Input()
  public sign: string;

  private _money: MoneyDto;

  public get money(): MoneyDto {
    return this._money || { amount: 0, currency: 'PLN' };
  }
}
