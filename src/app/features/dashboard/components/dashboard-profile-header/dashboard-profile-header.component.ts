import { Component, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { AvatarSizeEnum } from '../../../../shared/components/user-avatar/user-avatar.component';

@Component({
  selector: 'plat-dashboard-profile-header',
  templateUrl: './dashboard-profile-header.component.html',
  styleUrls: ['./dashboard-profile-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardProfileHeaderComponent {
  @Input()
  public avatarToken: string;
  @Input()
  public name: string;
  @Input()
  public description: string;
  @Input()
  public links: ReadonlyArray<string>;
  @Input()
  public isOwnProfile: boolean;
  @Input()
  public attachments: ReadonlyArray<string> = [];
  @Input()
  public expertId: string;

  @Output()
  public editProfile: EventEmitter<void> = new EventEmitter();
  @Output()
  public likeProfile: EventEmitter<void> = new EventEmitter();

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
