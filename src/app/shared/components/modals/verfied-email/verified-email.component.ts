import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import {
  IVerifiedEmailModalConfig,
  VERIFIED_EMAIL_MODAL_DATA,
} from '@platform/shared/components/modals/verfied-email/verified-email.helper';

@Component({
  templateUrl: 'verified-email.component.html',
  styleUrls: ['verified-email.component.sass'],
  providers: [ModalAnimationComponentService],
})
export class VerifiedEmailComponent implements OnInit, AfterViewInit {
  public headerModal: string;
  public contentMessage: string;
  private readonly initialModalHeight = '10px';

  constructor(
    private modal: NgbActiveModal,
    private modalAnimationComponentService: ModalAnimationComponentService,
    @Inject(VERIFIED_EMAIL_MODAL_DATA) private modalConfig: IVerifiedEmailModalConfig,
  ) {}

  public ngOnInit(): void {
    this.headerModal = this.modalConfig.modalHeaderTr;
    this.contentMessage = this.modalConfig.modalContentTr;
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.stopLoadingAnimation(this.initialModalHeight);
  }

  public onConfirmationClick(): void {
    this.modal.close();
  }
}
