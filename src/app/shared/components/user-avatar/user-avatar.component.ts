// tslint:disable:strict-boolean-expressions
import { Component, Input, OnInit } from '@angular/core';

export enum AvatarSizeEnum {
  X_24,
  X_32,
  X_48,
  X_156
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

  @Input()
  public avatarErrorValidation = false;

  @Input()
  public isOrganizationAvatar = false;

  public ngOnInit(): void {
    if (this.avatarToken) {
      this.avatarUrl = this.resolveFileUrl(this.avatarToken);
    }
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
  }

  private resolveFileUrl = (avatarToken: string): string =>
    `${window.location.origin}/files/${avatarToken}/download`

}
