import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarSizeEnum } from '../../../../../shared/components/user-avatar/user-avatar.component';
import { EmploymentWithService, ExpertProfileView } from '@anymind-ng/api';
import { EditProfileModalComponent } from '../../../../../shared/components/modals/profile/edit-profile/edit-profile.component';
import { takeUntil, pluck } from 'rxjs/operators';
import { ProfileBaseComponent } from '../../common/profile-base.component';
import { CreateExpertConsultationModalComponent } from '../../../../../shared/components/modals/create-expert-consultation/create-expert-consultation.component';
import { IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';

@Component({
  selector: 'plat-expert-dashboard',
  templateUrl: './expert-dashboard.view.component.html',
  styleUrls: ['./expert-dashboard.view.component.sass'],
})
export class ExpertDashboardComponent extends ProfileBaseComponent {
  public avatarToken: string;
  public name: string;
  public links: ReadonlyArray<string>;
  public description: string;
  public isOwnProfile: boolean;
  public consultations: ReadonlyArray<EmploymentWithService>;
  public expertId: string;
  public isLogged: boolean;
  public readonly avatarSize = AvatarSizeEnum.X_156;
  constructor(protected route: ActivatedRoute, injector: Injector) {
    super(injector);
    this.route.data
      .pipe(
        takeUntil(this.destroyed$),
        pluck('expert'),
      )
      .subscribe((data: IExpertCompanyDashboardResolverData<ExpertProfileView>) => {
        this.avatarToken = data.profile.expertProfile.avatar;
        this.name = data.profile.expertProfile.name;
        this.description = data.profile.expertProfile.description;
        this.links = this.getFlattenLinks(data.profile.employments);
        this.isOwnProfile = data.isOwnProfile;
        this.consultations = data.profile.employments;
        this.expertId = data.profile.expertProfile.id;
        this.isLogged = data.isLogged;
      });
  }
  /**
   * callback when edit profile is triggered.
   * Modal resolves to true if user changes something.
   */
  public editProfile = async (): Promise<void> => {
    const changed: boolean | undefined = await this.openModal(EditProfileModalComponent);
    this.realoadIfNeeded(changed);
  };
  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation = async (): Promise<void> => {
    const changed: boolean | undefined = await this.openModal(CreateExpertConsultationModalComponent);
    this.realoadIfNeeded(changed);
  };
}
