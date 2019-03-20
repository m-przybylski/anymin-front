import { Component, OnInit } from '@angular/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plat-expert-availbility',
  templateUrl: './expert-availbility.component.html',
  styleUrls: ['./expert-availbility.component.sass'],
})
export class ExpertAvailbilityComponent implements OnInit {
  public modalType: ModalContainerTypeEnum = ModalContainerTypeEnum.SMALL_NO_PADDING;

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private activeModal: NgbActiveModal,
  ) {}

  public ngOnInit(): void {
    this.modalAnimationComponentService.stopLoadingAnimation();
  }

  public onCloseModal(): void {
    this.activeModal.close();
  }
}
