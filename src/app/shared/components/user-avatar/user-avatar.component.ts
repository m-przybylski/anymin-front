// tslint:disable:strict-boolean-expressions
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonConfig } from '../../../../common-config';
import { ConfigDEFAULT } from '../../../../../generated_modules/common-config/common-config.default';

export enum AvatarSizeEnum {
  X_24,
  X_32,
  X_48,
  X_156,
}

@Component({
  selector: 'plat-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class UserAvatarComponent {
  @Input() public avatarSize: AvatarSizeEnum;

  @Input()
  public set avatarToken(value: string | undefined) {
    this.avatarUrl = typeof value !== 'undefined' && value !== '' ? this.resolveFileUrl(value) : undefined;
  }

  @Input() public avatarUrl?: string;

  @Input() public avatarError? = false;

  @Input() public avatarErrorValidation = false;

  @Input() public isOrganizationAvatar = false;

  private commonConfig: ConfigDEFAULT;

  constructor() {
    this.commonConfig = CommonConfig.getCommonConfig();
  }

  public setAvatarClass = (): string => {
    switch (this.avatarSize) {
      case AvatarSizeEnum.X_24:
        return 'user-avatar--x24';

      case AvatarSizeEnum.X_32:
        return 'user-avatar--x32';

      case AvatarSizeEnum.X_48:
        return 'user-avatar--x48';

      case AvatarSizeEnum.X_156:
        return 'user-avatar--x156';

      default:
        return 'user-avatar--x48';
    }
  };

  private resolveFileUrl = (avatarToken: string): string =>
    window.location.origin + this.commonConfig.urls['file-download'].replace('%s', avatarToken);
}
