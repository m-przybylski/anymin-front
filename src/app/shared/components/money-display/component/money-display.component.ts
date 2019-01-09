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

  public get money(): MoneyDto {
    return this._money || { value: 0, currency: 'PLN' };
  }

  @Input()
  public set sign(value: string) {
    this._sign = value;
  }

  public get sign(): string {
    if (this._sign && this.money.value !== 0) {
      return this._sign;
    }

    return '';
  }

  private _money: MoneyDto;
  private _sign: string;
}
