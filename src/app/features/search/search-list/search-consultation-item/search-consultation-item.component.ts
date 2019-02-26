import { Component, Input } from '@angular/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { GetSearchRequestResult } from '@anymind-ng/api';

@Component({
  selector: 'plat-search-consultation-item',
  templateUrl: './search-consultation-item.component.html',
  styleUrls: ['./search-consultation-item.component.sass'],
})
export class SearchConsultationItemComponent {
  public readonly avatarSize96 = AvatarSizeEnum.X_96;
  public isExpertConsultation = true;

  @Input()
  public item: GetSearchRequestResult;
}
