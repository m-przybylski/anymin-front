// tslint:disable:strict-boolean-expressions
import { Component, Input, ViewEncapsulation } from '@angular/core';

export enum AvatarSizeEnum {
  X_24,
  X_32,
  X_40,
  X_56,
  X_48,
  X_96,
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
  public loaded = false;

  public setAvatarClass = (): string => {
    // tslint:disable-next-line:cyclomatic-complexity
    switch (this.avatarSize) {
      case AvatarSizeEnum.X_24:
        return 'user-avatar--x24';

      case AvatarSizeEnum.X_32:
        return 'user-avatar--x32';

      case AvatarSizeEnum.X_40:
        return 'user-avatar--x40';

      case AvatarSizeEnum.X_48:
        return 'user-avatar--x48';

      case AvatarSizeEnum.X_56:
        return 'user-avatar--x56';

      case AvatarSizeEnum.X_96:
        return 'user-avatar--x96';

      case AvatarSizeEnum.X_156:
        return 'user-avatar--x156';

      default:
        return 'user-avatar--x48';
    }
  };

  private resolveFileUrl = (avatarToken: string): string => `${window.location.origin}/files/${avatarToken}/download`;
}
