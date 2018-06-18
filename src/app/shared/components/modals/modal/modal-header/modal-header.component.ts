import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plat-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.sass']
})
export class ModalHeaderComponent {

  @Input()
  public titleTrHeader?: string;

  @Input()
  public onBackWardClick?: () => void;

  @Input()
  public isBackWardVisible = false;

  constructor(public activeModal: NgbActiveModal) {
  }

  public onModalClose = (): void =>
    this.activeModal.close()

  public onBackClick = (): void => {
    if (this.onBackWardClick)
      this.onBackWardClick();
  }

}
