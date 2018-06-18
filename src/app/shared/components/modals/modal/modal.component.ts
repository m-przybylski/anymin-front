import {
  Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ContentHeightAnimationService
}
  from '../../../services/animation/content-height/content-height.animation.service';

export enum ModalContainerWidthEnum {
  SmallWidth = 'modal-component__container--small',
  MediumWidth = 'modal-component__container--medium',
  BigWidth = 'modal-component__container--big'
}

@Component({
  selector: 'plat-modal-component',
  styleUrls: ['./modal.component.sass'],
  templateUrl: './modal.component.html'
})

export class ModalComponent implements OnInit, OnDestroy {

  @Input()
  public modalTrTitleHeader?: string;

  @Input()
  public isBackWardVisible?: boolean;

  @Input()
  public onBackWardClick?: () => void;

  @Input()
  public modalContainerClass?: ModalContainerWidthEnum;

  constructor(public activeModal: NgbActiveModal,
              private contentHeightService: ContentHeightAnimationService) {
  }

  public ngOnInit(): void {
    if (!this.modalContainerClass)
      this.modalContainerClass = ModalContainerWidthEnum.MediumWidth;
  }

  public ngOnDestroy(): void {
    this.contentHeightService.getPreviousHeight$().next('inherit');
  }

  public onBackClick = (): void => {
    if (this.onBackWardClick)
      this.onBackWardClick();
  }

  public onModalClose = (): void =>
    this.activeModal.close()

}
