import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MoneyDto } from '@anymind-ng/api';
import * as moment from 'moment';

@Component({
  selector: 'plat-select-promo-code-radio',
  templateUrl: 'select-promo-code-radio.component.html',
  styleUrls: ['./select-promo-code-radio.component.sass'],
})
export class SelectPromoCodeRadioComponent implements OnInit {
  @Input()
  public form: FormGroup;

  @Input()
  public controlName: string;

  @Input()
  public expiryDate: string;

  @Input()
  public id: string;

  @Input()
  public selectedCardId: string;

  @Input()
  public promoCodeAmount: MoneyDto;

  @Output()
  public onSelectCard: EventEmitter<string> = new EventEmitter<string>();

  public ngOnInit(): void {
    this.expiryDate = moment(this.expiryDate).format('MM/YY');
  }

  public onCardClick(event: MouseEvent): void {
    event.stopPropagation();
    this.onSelectCard.emit(this.id);
  }
}
