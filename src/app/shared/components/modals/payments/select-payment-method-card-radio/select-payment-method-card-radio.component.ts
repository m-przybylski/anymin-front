import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'plat-select-payment-method-card-radio',
  templateUrl: 'select-payment-method-card-radio.component.html',
  styleUrls: ['select-payment-method-card-radio.component.sass'],
})
export class SelectPaymentMethodCardRadioComponent {
  @Input('form')
  public form: FormGroup;

  @Input()
  public controlName: string;

  @Input()
  public expiryDate: string;

  @Input()
  public maskedNumber: string;

  @Input()
  public id: string;

  @Input()
  public selectedCardId: string;

  @Input()
  public cardType: string;

  @Output()
  public onSelectCard: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDeleteCard: EventEmitter<string> = new EventEmitter<string>();

  public onCardClick = (event: MouseEvent): void => {
    event.stopPropagation();
    this.onSelectCard.emit(this.id);
  };

  public deleteCard = (event: MouseEvent): void => {
    event.stopPropagation();
    this.onDeleteCard.emit(this.id);
  };
}
