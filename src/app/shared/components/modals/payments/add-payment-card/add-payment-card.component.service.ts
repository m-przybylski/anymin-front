import { Injectable } from '@angular/core';
import { PaymentsService, PostAddNewCard, ThreeDSecureUrl } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { Environment, EnvironmentService } from '@platform/core/services/environment/environment.service';
import { FormGroup } from '@angular/forms';
import { Config } from '../../../../../../config';
// tslint:disable-next-line
const jsencrypt = require('jsencrypt');

@Injectable()
export class AddPaymentCardComponentService {
  private readonly monthSignsLength = 2;

  // tslint:disable-next-line:no-any
  private jsencrypt: any;

  constructor(private paymentsService: PaymentsService) {
    this.createTPayPublicKey();
  }

  public sendPaymentCard = (paymentCardForm: FormGroup): Observable<ThreeDSecureUrl> =>
    this.postPaymentCard(this.mapFormValues(paymentCardForm));

  private postPaymentCard = (cardDetails: PostAddNewCard): Observable<ThreeDSecureUrl> =>
    this.paymentsService.postCreditCardRoute(cardDetails);

  private mapFormValues = (formGroup: FormGroup): PostAddNewCard => ({
    name: formGroup.value.nameSurnameControl,
    email: formGroup.value.emailControl,
    encryptedCard: this.encryptCardData(this.createStringToEncryptCard(formGroup)),
    expiryDate: this.adjustFormatExpireDate(formGroup.value.expireDateControlName),
    cardType: formGroup.value.cvcCardType,
    language: 'pl',
    redirectUrlOnSuccess: `${window.location.origin}/assets/html/self_close/self_close.html`,
    redirectUrlOnFailure: `${window.location.origin}/assets/html/self_close/self_close.html`,
  });

  private encryptCardData = (val: string): string => this.jsencrypt.encrypt(val);

  private createTPayPublicKey = (): void => {
    const environment = EnvironmentService.get();
    this.jsencrypt = new jsencrypt.JSEncrypt();

    switch (environment) {
      case Environment.PRODUCTION:
        this.jsencrypt.setPublicKey(Config.paymentCardPublicKeys.productionKey);
        break;

      default:
        this.jsencrypt.setPublicKey(Config.paymentCardPublicKeys.stageKey);
    }
  };

  private createStringToEncryptCard = (formGroup: FormGroup): string =>
    `${formGroup.value.cardNumberControlName}|` +
    `${this.adjustFormatExpireDate(formGroup.value.expireDateControlName)}|` +
    `${formGroup.value.codeCVControlName}|` +
    `https://${window.location.host}`;

  private adjustFormatExpireDate = (expireDate: string): string =>
    `${expireDate.slice(0, this.monthSignsLength)}/${expireDate.slice(this.monthSignsLength)}`;
}
