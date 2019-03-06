import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { CORE_CONFIG } from '../../../shared/injection-tokens/injection-tokens';
import { CoreConfig } from '../../../core-config';

export enum AvatarSize {
  SMALL,
  BIG,
}

@Component({
  selector: 'am-core-user-avatar',
  templateUrl: 'user-avatar.component.html',
  styleUrls: ['user-avatar.component.sass'],
})
export class UserAvatarComponent implements OnInit, OnChanges {
  @Input()
  public tokenAvatar: string;

  @Input()
  public avatarSize?: number;

  public avatarUrl = '';

  public isBrokenImage = false;

  public avatarSizes: typeof AvatarSize = AvatarSize;

  constructor(@Inject(CORE_CONFIG) private coreConfig: CoreConfig) {}

  public ngOnInit(): void {
    this.avatarUrl = this.resolveFileUrl(this.tokenAvatar);
  }

  public ngOnChanges(): void {
    this.avatarUrl = this.resolveFileUrl(this.tokenAvatar);
  }

  public brokenImageHandler(_sourceImg: HTMLImageElement): void {
    this.isBrokenImage = true;
  }

  private resolveFileUrl(fileId: string): string {
    return this.coreConfig.urls.files + this.coreConfig.urls.filePreviewDownload.replace('%s', fileId);
  }
}
