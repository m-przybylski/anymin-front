import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CONFIRMATION_DATA, IConfirmationConfig } from '../confirmations.helpers';
import { ModalComponent } from '@platform/shared/components/modals/modal/modal.component';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';

@Component({
  templateUrl: 'confirmation-modal.component.html',
  styleUrls: ['confirmation-modal.component.sass'],
  providers: [ModalAnimationComponentService],
})
export class ConfirmationModalComponent implements AfterViewInit {
  public header: string;
  public headerModal: string;

  @ViewChild(ModalComponent)
  private modalComponent: ModalComponent;

  constructor(private modal: NgbActiveModal, @Inject(CONFIRMATION_DATA) confirmationConfig: IConfirmationConfig) {
    this.header = confirmationConfig.header;
    this.headerModal = confirmationConfig.modalHeader;
  }
  public ngAfterViewInit(): void {
    this.modalComponent.stopLoadingAnimation();
  }
  public onConfirmationClick = (result: boolean): void => {
    this.modal.close(result);
  };
}
