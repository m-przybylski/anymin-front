import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../../../shared/components/user-avatar/user-avatar.component';

@Component({
  selector: 'plat-dashboard-profile-header',
  templateUrl: './dashboard-profile-header.component.html',
  styleUrls: ['./dashboard-profile-header.component.sass'],
})
export class DashboardProfileHeaderComponent implements OnInit {
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
  public expertId?: string;
  @Input()
  public isLogged = false;
  @Input()
  public companyId?: string;
  @Input()
  public filesLength?: string;

  @Output()
  public editProfile: EventEmitter<void> = new EventEmitter();
  @Output()
  public likeProfile: EventEmitter<void> = new EventEmitter();
  @Output()
  public openGallery: EventEmitter<void> = new EventEmitter();

  public readonly avatarSize = AvatarSizeEnum.X_156;

  private profileId: string;
  private isExpertProfile = false;

  public ngOnInit(): void {
    if (typeof this.expertId !== 'undefined') {
      this.profileId = this.expertId;
      this.isExpertProfile = true;
    }
    if (typeof this.companyId !== 'undefined') {
      this.profileId = this.companyId;
      this.isExpertProfile = false;
    }
  }

  public get isGalleryPreviewVisible(): boolean {
    return this.attachments.length > 0;
  }

  public editProfileClick = (): void => {
    this.editProfile.emit();
  };

  public likeProfileClick = (): void => {
    this.likeProfile.emit();
  };

  public openFilePreviewModal = (): void => {
    this.openGallery.emit();
  };

  public get attachmentCount(): { value: number } {
    return { value: this.attachments.length };
  }
}
