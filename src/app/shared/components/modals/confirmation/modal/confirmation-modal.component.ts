import { Component, Inject, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CONFIRMATION_DATA, IConfirmationConfig } from '../confirmations.helpers';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';

@Component({
  templateUrl: 'confirmation-modal.component.html',
  styleUrls: ['confirmation-modal.component.sass'],
  providers: [ModalAnimationComponentService],
})
export class ConfirmationModalComponent implements AfterViewInit {
  public header: string;
  public headerModal: string;

  private readonly initialModalHeight = '100px';

  constructor(
    private modal: NgbActiveModal,
    private modalAnimationComponentService: ModalAnimationComponentService,
    @Inject(CONFIRMATION_DATA) confirmationConfig: IConfirmationConfig,
  ) {
    this.header = confirmationConfig.header;
    this.headerModal = confirmationConfig.modalHeader;
  }
  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.stopLoadingAnimation(this.initialModalHeight);
  }
  public onConfirmationClick = (result: boolean): void => {
    this.modal.close(result);
  };
}
