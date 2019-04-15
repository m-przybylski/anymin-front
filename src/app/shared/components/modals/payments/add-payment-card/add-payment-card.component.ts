import { Component } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';

@Component({
  selector: 'plat-add-payment-card',
  templateUrl: './add-payment-card.component.html',
  styleUrls: ['./add-payment-card.component.sass'],
})
export class AddPaymentCardModal {
  public modalHeaderTitle = 'DASHBOARD.PAYMENTS.PAYMENTS_METHOD.MODAL.TITLE';
  public modalWidth = ModalContainerTypeEnum.SMALL_NO_PADDING;

  public changeModalTitle(modalTitle: string): void {
    this.modalHeaderTitle = modalTitle;
  }
}
