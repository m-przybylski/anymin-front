import { Component, Input } from '@angular/core';
import { MoneyDto } from '@anymind-ng/api';

export interface IRefundOperationDetails {
  id: string;
  date: Date;
  refundValue: MoneyDto;
}

@Component({
  selector: 'plat-refund-details',
  templateUrl: './refund-details.component.html',
  styleUrls: ['./refund-details.component.sass'],
})
export class RefundDetailsComponent {
  @Input()
  public set refundOperationDetails(value: IRefundOperationDetails | undefined) {
    if (typeof value !== 'undefined') {
      this.id = value.id;
      this.date = value.date;
      this.refund = value.refundValue;
    }
  }

  public id: string;
  public date: Date;
  public refund: MoneyDto;
}
