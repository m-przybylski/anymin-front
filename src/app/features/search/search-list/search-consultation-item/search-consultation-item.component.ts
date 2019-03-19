import { Component, Injector, Input, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { GetSearchRequestResult } from '@anymind-ng/api';
import {
  ConsultationDetailsModalComponent,
  EXPERT_ID,
  SERVICE_ID,
} from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plat-search-consultation-item',
  templateUrl: './search-consultation-item.component.html',
  styleUrls: ['./search-consultation-item.component.sass'],
})
export class SearchConsultationItemComponent implements OnInit {
  public readonly avatarSize96 = AvatarSizeEnum.X_96;
  public isExpertConsultation = false;

  @Input()
  public item: GetSearchRequestResult;

  constructor(private modalService: NgbModal) {}

  public ngOnInit(): void {
    this.isExpertConsultation = this.item.expertProfile.id === this.item.ownerProfile.id;
  }

  public prepareProfileUrl(): void {
    const options: NgbModalOptions = {
      injector: Injector.create({
        providers: [
          { provide: SERVICE_ID, useValue: this.item.service.id },
          { provide: EXPERT_ID, useValue: this.item.expertProfile.id },
        ],
      }),
    };

    this.modalService.open(ConsultationDetailsModalComponent, options);
  }
}
