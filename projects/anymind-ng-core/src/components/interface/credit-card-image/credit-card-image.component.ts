import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'am-core-credit-card-image',
  templateUrl: 'credit-card-image.component.html',
  styleUrls: ['./credit-card-image.sass'],
})
export class CreditCardImageComponent {
  @Input()
  public set cardNumber(cardNumber: string) {
    this.determineCardImage(cardNumber);
  }

  @Input()
  public isWidget: boolean;

  public creditCardImageUrl = '';

  @Output()
  public creditCardType: EventEmitter<string> = new EventEmitter();

  private readonly cardRegexArray: ReadonlyArray<any> = [
    { regex: `^4[0-9]{12}(?:[0-9]{3})?$`, value: 'VISA' },
    {
      regex: `^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$`,
      value: 'MASTERCARD',
    },
  ];

  private determineCardImage(cardNumber: string): void {
    const tmpArray = this.cardRegexArray.filter(regex => this.isCardValid(cardNumber, regex.regex));

    if (tmpArray.length > 0) {
      this.creditCardImageUrl = `${tmpArray[0].value.toLocaleLowerCase()}`;
      this.creditCardType.next(tmpArray[0].value);
    } else {
      this.creditCardImageUrl = '';
    }
  }

  private isCardValid(cardNumber: string, regex: string): boolean {
    const regexObj = new RegExp(regex);

    return regexObj.test(cardNumber);
  }
}
