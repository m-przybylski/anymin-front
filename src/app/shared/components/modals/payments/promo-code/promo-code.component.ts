import { Component, OnInit } from '@angular/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';

@Component({
  selector: 'plat-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.sass'],
})
export class PromoCodeComponent implements OnInit {
  public modalWidth: ModalContainerTypeEnum = ModalContainerTypeEnum.SMALL_NO_PADDING;
  public modalHeaderTitle = 'MODAL.PROMO_CODE.MODAL.TITLE';

  constructor(private modalAnimationComponentService: ModalAnimationComponentService) {}

  public ngOnInit(): void {
    this.modalAnimationComponentService.stopLoadingAnimation();
  }
}
