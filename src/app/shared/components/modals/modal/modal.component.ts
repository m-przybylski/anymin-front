// tslint:disable:strict-boolean-expressions
import {
  Component, Input, OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export enum ModalContainerWidthEnum {
  SMALL_WIDTH,
  MEDIUM_WIDTH,
  BIG_WIDTH,
  CROPP_WIDTH
}

@Component({
  selector: 'plat-modal-component',
  styleUrls: ['./modal.component.sass'],
  templateUrl: './modal.component.html'
})

export class ModalComponent implements OnInit {

  @Input()
  public modalTrTitleHeader?: string;

  @Input()
  public isBackwardVisible?: boolean;

  @Input()
  public onBackwardClick?: () => void;

  @Input()
  public modalContainerClass?: ModalContainerWidthEnum;

  @Input()
  public isCloseButtonVisible ? = true;

  constructor(private activeModal: NgbActiveModal) {
  }

  public ngOnInit(): void {
    this.setModalContainerWidth();
    if (!this.modalContainerClass) {
      this.modalContainerClass = ModalContainerWidthEnum.MEDIUM_WIDTH;
    }
  }

  public onBackClick = (): void => {
    if (this.onBackwardClick) {
      this.onBackwardClick();
    }
  }

  public onModalClose = (): void =>
    this.activeModal.close()

  public setModalContainerWidth = (): string => {
    switch (this.modalContainerClass) {
      case ModalContainerWidthEnum.SMALL_WIDTH:
        return 'modal-component__container--small';

      case ModalContainerWidthEnum.MEDIUM_WIDTH:
        return 'modal-component__container--medium';

      case ModalContainerWidthEnum.BIG_WIDTH:
        return 'modal-component__container--big';

      case ModalContainerWidthEnum.CROPP_WIDTH:
        return 'modal-component__container--cropp';

      default:
        return 'modal-component__container--medium';
    }
  }
}
