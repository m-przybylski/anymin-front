import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExpertDashboardResolverData } from './expert-dashboard-resolver.service';
import { AvatarSizeEnum } from '../../../../shared/components/user-avatar/user-avatar.component';
import { EmploymentWithService } from '@anymind-ng/api';

@Component({
  selector: 'plat-expert-dashboard',
  templateUrl: './expert-dashboard.view.component.html',
  styleUrls: ['./expert-dashboard.view.component.sass'],
})
export class ExpertDashboardComponent {
  public avatarToken: string;
  public name: string;
  public links: string[];
  public description: string;
  public isOwnProfile: boolean;
  public consultations: EmploymentWithService[];
  public readonly avatarSize = AvatarSizeEnum.X_156;
  constructor(private route: ActivatedRoute) {
    const data: IExpertDashboardResolverData = this.route.snapshot.data.expert;
    this.avatarToken = data.expertProfile.expertProfile.avatar;
    this.name = data.expertProfile.expertProfile.name;
    this.description = data.expertProfile.expertProfile.description;
    this.links = this.getFlattenLinks(data.expertProfile.employments);
    this.isOwnProfile = data.isOwnProfile;
    this.consultations = data.expertProfile.employments;
  }

  private getFlattenLinks = (employments: EmploymentWithService[]): string[] => {
    const set = new Set(
      employments
        .map(
          employement =>
            (employement.serviceDetails.ownerProfile.expertDetails &&
              employement.serviceDetails.ownerProfile.expertDetails.links) ||
            [],
        )
        .reduce((acc, cur) => acc.concat(cur)),
    );

    return Array.from(set);
  };
}
