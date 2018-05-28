import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponentEditProfile } from '../../../../shared/components/navbar/edit-profile/edit-profile.component';

@Component({
  selector: 'plat-discover',
  templateUrl: './discover.view.component.html',
  styleUrls: ['./discover.view.component.sass']
})
export class DiscoverComponent {
  private isOpenAsExpert = false;

  constructor(private modalService: NgbModal) {
  }

  public open = (): void => {
    this.modalService.open(ModalComponentEditProfile).componentInstance.isOpenAsExpert = this.isOpenAsExpert;
  }
}
