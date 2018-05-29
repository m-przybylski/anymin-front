import { Component, Input } from '@angular/core';
import { GetExpertVisibility } from 'profitelo-api-ng/model/models';
import { AvatarSizesEnum } from '../../../user-avatar/user-avatar.component';

@Component({
  selector: 'plat-navbar-user-avatar',
  templateUrl: './navbar-user-avatar.component.html',
  styleUrls: ['./navbar-user-avatar.component.sass']
})
export class NavbarUserAvatarComponent {

  @Input()
  public avatarToken?: string;

  @Input()
  public userVisibility?: GetExpertVisibility.VisibilityEnum;

  public readonly avatarSize = AvatarSizesEnum.x48;
  public visibilityStatusEnum: typeof GetExpertVisibility.VisibilityEnum = GetExpertVisibility.VisibilityEnum;

  constructor() {
  }

}
