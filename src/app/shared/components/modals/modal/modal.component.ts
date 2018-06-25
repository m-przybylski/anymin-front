import {
  Component, Input, OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export enum ModalContainerWidthEnum {
  SmallWidth = 'modal-component__container--small',
  MediumWidth = 'modal-component__container--medium',
  BigWidth = 'modal-component__container--big',
  CroppWidth = 'modal-component__container--cropp'
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
  public isBackWardVisible?: boolean;

  @Input()
  public onBackWardClick?: () => void;

  @Input()
  public modalContainerClass?: ModalContainerWidthEnum;

  constructor(private activeModal: NgbActiveModal) {
  }

  public ngOnInit(): void {
    if (!this.modalContainerClass)
      this.modalContainerClass = ModalContainerWidthEnum.MediumWidth;
  }

  public onBackClick = (): void => {
    if (this.onBackWardClick)
      this.onBackWardClick();
  }

  public onModalClose = (): void =>
    this.activeModal.close()

}
