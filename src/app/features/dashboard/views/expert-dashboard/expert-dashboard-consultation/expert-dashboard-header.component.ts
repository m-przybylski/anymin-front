import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AvatarSizeEnum } from '../../../../../shared/components/user-avatar/user-avatar.component';

@Component({
  selector: 'plat-expert-dashboard-header',
  templateUrl: './expert-dashboard-header.component.html',
  styleUrls: ['./expert-dashboard-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpertDashboardHeaderComponent {
  @Input() public avatarToken: string;
  @Input() public name: string;
  @Input() public description: string;
  @Input() public links: string[];
  @Input() public isOwnProfile: boolean;

  public readonly avatarSize = AvatarSizeEnum.X_156;
}
