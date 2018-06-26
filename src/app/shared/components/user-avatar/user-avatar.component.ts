import { Component, Input, OnInit } from '@angular/core';
import { CommonConfig } from '../../../../common-config';
import { ConfigDEFAULT } from '../../../../../generated_modules/common-config/common-config.default';

export enum AvatarSizeEnum {
  X_32,
  X_48,
  X_152
}

@Component({
  selector: 'plat-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.sass']
})
export class UserAvatarComponent implements OnInit {

  @Input()
  public avatarSize: AvatarSizeEnum;

  @Input()
  public avatarToken?: string;

  @Input()
  public avatarUrl?: string;

  @Input()
  public avatarError ? = false;

  private commonConfig: ConfigDEFAULT;

  constructor() {
    this.commonConfig = CommonConfig.getCommonConfig();
  }

  public ngOnInit(): void {
    if (this.avatarToken) {
      this.avatarUrl = this.resolveFileUrl(this.avatarToken);
    }
  }

  public setAvatarClass = (): string => {
    switch (this.avatarSize) {
      case AvatarSizeEnum.X_32:
        return 'user-avatar--x32';

      case AvatarSizeEnum.X_48:
        return 'user-avatar--x48';

      case AvatarSizeEnum.X_152:
        return 'user-avatar--x152';

      default:
        return 'user-avatar--x48';
    }
  }

  private resolveFileUrl = (avatarToken: string): string =>
    this.commonConfig.urls.files + this.commonConfig.urls['file-download'].replace('%s', avatarToken)

}
