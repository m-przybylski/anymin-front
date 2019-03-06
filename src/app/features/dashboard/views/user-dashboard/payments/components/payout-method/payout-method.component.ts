import { AfterViewInit, Component } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { GetPayoutMethod } from '@anymind-ng/api';

export enum PayoutMethodEnum {
  BANK_ACCOUNT,
  PAYPAL,
}

@Component({
  templateUrl: './payout-method.component.html',
  styleUrls: ['./payout-method.component.sass'],
})
export class PayoutMethodComponent implements AfterViewInit {
  public readonly modalWidth = ModalContainerTypeEnum.SMALL_WIDTH;
  public selectedPayoutMethodType = PayoutMethodEnum.BANK_ACCOUNT;

  public payoutMethods = PayoutMethodEnum;
  public getPayoutMethod: GetPayoutMethod;

  constructor(private modalAnimationComponentService: ModalAnimationComponentService) {}

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.onModalContentChange().next(false);
  }

  public selectPayoutMethod(payoutMethod: PayoutMethodEnum): void {
    this.selectedPayoutMethodType = payoutMethod;
  }
}
