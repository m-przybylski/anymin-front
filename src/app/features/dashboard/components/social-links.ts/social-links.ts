import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProfileLinksComponentService } from '../../../../shared/components/modals/profile/components/profile-links/profile-links.component.service';

@Component({
  selector: 'plat-social-links',
  templateUrl: './social-links.html',
  styleUrls: ['./social-links.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileLinksComponentService],
})
export class SocialLinksComponent {
  @Input()
  public links: ReadonlyArray<string>;
  constructor(private profileLinksComponentService: ProfileLinksComponentService) {}

  public getIconClass = (link: string): string =>
    this.profileLinksComponentService.cropSocialMediaLinkAsName(link).iconName;
}
