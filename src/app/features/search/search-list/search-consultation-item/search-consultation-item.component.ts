import { Component, Input, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { GetSearchRequestResult } from '@anymind-ng/api';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.isExpertConsultation = this.item.expertProfile.id === this.item.ownerProfile.id;
  }

  public prepareProfileUrl(item: GetSearchRequestResult): void {
    this.router.navigate([`/dashboard/user/profile/${item.expertProfile.id}`], {
      queryParams: {
        serviceId: item.service.id,
      },
    });
  }
}
