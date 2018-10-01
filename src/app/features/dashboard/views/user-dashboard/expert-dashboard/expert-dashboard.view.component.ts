import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarSizeEnum } from '../../../../../shared/components/user-avatar/user-avatar.component';
import { EmploymentWithService, ExpertProfileView } from '@anymind-ng/api';
import { CreateProfileModalComponent } from '../../../../../shared/components/modals/profile/create-profile/create-profile.component';
import { takeUntil, pluck } from 'rxjs/operators';
import { ProfileBaseComponent } from '../../common/profile-base.component';
import { CreateExpertConsultationModalComponent } from '../../../../../shared/components/modals/create-expert-consultation/create-expert-consultation.component';
import { IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';

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
    const changed: boolean | undefined = await this.openModalResult(CreateProfileModalComponent);
    this.realoadIfNeeded(changed);
  };
  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation = async (): Promise<void> => {
    const changed: boolean | undefined = await this.openModalResult(CreateExpertConsultationModalComponent);
    this.realoadIfNeeded(changed);
  };

  /**
   * callback to open consultation detail modal
   */
  public openConsultationDetail = async (serviceId: string, expertId: string): Promise<void> => {
    const modalRef = this.openModal(ConsultationDetailsViewComponent);
    modalRef.componentInstance.expertId = expertId;
    modalRef.componentInstance.serviceId = serviceId;
    const closedServiceId: string | undefined = await modalRef.result;
    if (closedServiceId === serviceId) {
      this.reload();
    }
  };
}
