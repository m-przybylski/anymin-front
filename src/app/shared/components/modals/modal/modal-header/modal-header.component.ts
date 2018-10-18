// tslint:disable:strict-boolean-expressions
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plat-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.sass'],
})
export class ModalHeaderComponent {
  @Input()
  public titleTrHeader?: string;

  @Input()
  public isBackwardVisible = false;

  @Input()
  public isCloseButtonVisible = true;

  @Output()
  public backwardClick = new EventEmitter<void>();

  constructor(public activeModal: NgbActiveModal) {}

  public onModalClose = (): void => this.activeModal.close();

  public onBackClick = (): void => {
    this.backwardClick.next();
  };
}
