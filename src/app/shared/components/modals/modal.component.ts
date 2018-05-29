import {
  Component
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  styleUrls: ['./modal.component.sass'],
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  constructor(public activeModal: NgbActiveModal) {
  }

  public onModalClose = (): void =>
    this.activeModal.close()
}
