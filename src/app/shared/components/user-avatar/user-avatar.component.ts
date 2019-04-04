// tslint:disable:strict-boolean-expressions
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FileUrlResolveService } from '@platform/shared/services/file-url-resolve/file-url-resolve.service';
import { RouterHelpers, RouterPaths } from '@platform/shared/routes/routes';
import { Router } from '@angular/router';

export enum AvatarSizeEnum {
  X_24,
  X_32,
  X_48,
  X_40,
  X_80,
  X_56,
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
  public expertProfileId?: string;
  @Input()
  public organizationProfileId?: string;

  @Input()
  public isOrganizationAvatar = false;

  public avatarUrl?: string;
  public loaded = false;

  constructor(private fileUrlResolveService: FileUrlResolveService, private router: Router) {}

  public setAvatarClass(): string {
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

      case AvatarSizeEnum.X_80:
        return 'user-avatar--x80';

      case AvatarSizeEnum.X_96:
        return 'user-avatar--x96';

      case AvatarSizeEnum.X_156:
        return 'user-avatar--x156';

      default:
        return 'user-avatar--x48';
    }
  }

  public onAvatarClicked(): void {
    const pathToNavigate =
      this.expertProfileId !== undefined
        ? RouterHelpers.replaceParams(RouterPaths.dashboard.user.profile.asPath, {
            [RouterPaths.dashboard.user.profile.params.expertId]: this.expertProfileId,
          })
        : this.organizationProfileId !== undefined
        ? RouterHelpers.replaceParams(RouterPaths.dashboard.company.profile.asPath, {
            [RouterPaths.dashboard.company.profile.params.profileId]: this.organizationProfileId,
          })
        : undefined;
    if (pathToNavigate !== undefined) {
      this.router.navigate([pathToNavigate]);
    }
  }

  private resolveFileUrl(avatarToken: string): string {
    return this.fileUrlResolveService.getFilePreviewDownloadUrl(avatarToken);
  }
}
