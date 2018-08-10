import { Component, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
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
  @Input() public attachments: string[] = [];
  @Input() public expertId: string;

  @Output() public editProfile: EventEmitter<void> = new EventEmitter();
  @Output() public likeProfile: EventEmitter<void> = new EventEmitter();

  public readonly avatarSize = AvatarSizeEnum.X_156;

  public editProfileClick = (): void => {
    this.editProfile.next();
  };

  public likeProfileClick = (): void => {
    this.likeProfile.next();
  };

  public get attachmentCount(): { value: number } {
    return { value: this.attachments.length };
  }
}
