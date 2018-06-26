import { Component, Input, OnInit } from '@angular/core';
import { CommonConfig } from '../../../../common-config';
import { ConfigDEFAULT } from '../../../../../generated_modules/common-config/common-config.default';

export enum AvatarSizesEnum {
  X_32 = 'user-avatar--x32',
  X_48 = 'user-avatar--x48',
  X_152 = 'user-avatar--x152'
}

@Component({
  selector: 'plat-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.sass']
})
export class UserAvatarComponent implements OnInit {

  @Input()
  public avatarSize: string;

  @Input()
  public avatarToken?: string;

  @Input()
  public avatarUrl?: string;

  private commonConfig: ConfigDEFAULT;

  constructor() {
    this.commonConfig = CommonConfig.getCommonConfig();
  }

  public ngOnInit(): void {
    if (this.avatarToken) {
      this.avatarUrl = this.resolveFileUrl(this.avatarToken);
    }
  }

  private resolveFileUrl = (avatarToken: string): string =>
    this.commonConfig.urls.files + this.commonConfig.urls['file-download'].replace('%s', avatarToken)

}
