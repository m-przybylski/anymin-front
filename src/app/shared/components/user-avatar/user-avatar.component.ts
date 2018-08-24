// tslint:disable:strict-boolean-expressions
import { Component, Input, ViewEncapsulation } from '@angular/core';

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
  @Input()
  public avatarSize: AvatarSizeEnum;

  @Input()
  public set avatarToken(value: string) {
    this.avatarUrl = value ? this.resolveFileUrl(value) : '';
  }

  @Input()
  public avatarError = false;

  @Input()
  public avatarErrorValidation = false;

  @Input()
  public isOrganizationAvatar = false;

  public avatarUrl?: string;

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

  private resolveFileUrl = (avatarToken: string): string => `${window.location.origin}/files/${avatarToken}/download`;
}
