import { Component, Input } from '@angular/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';

@Component({
  selector: 'plat-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.sass'],
})
export class ConsultationDetailsComponent {
  public readonly companyAvatarSize = AvatarSizeEnum.X_40;

  @Input()
  public avatarSize?: string;
  @Input()
  public avatarToken?: string;
  @Input()
  public expertName?: string;
  @Input()
  public expertId?: string;
  @Input()
  public serviceName?: string;
  @Input()
  public registeredAt?: Date;
  @Input()
  public serviceDescription?: string;
  @Input()
  public tagList: ReadonlyArray<string> = [];
  @Input()
  public usageCounter = 0;
  @Input()
  public ratingCounter = 0;
  @Input()
  public commentCounter = 0;
  @Input()
  public companyName: string;
  @Input()
  public companyLogo: string;
}
