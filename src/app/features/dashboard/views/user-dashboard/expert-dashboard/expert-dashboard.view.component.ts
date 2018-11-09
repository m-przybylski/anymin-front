import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { EmploymentWithService, ProfileDocument } from '@anymind-ng/api';
import { CreateProfileModalComponent } from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { takeUntil, pluck } from 'rxjs/operators';
import { ProfileBaseComponent } from '../../common/profile-base.component';
import { IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import {
  CreateEditConsultationModalComponent,
  ICreateEditConsultationPayload,
} from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { CONSULTATIONDETAILS } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { IExpertProfile } from './services/expert-dashboard-resolver.service';

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
  public consultations: ReadonlyArray<EmploymentWithService> = [];
  public expertId: string;
  public isLogged: boolean;
  public isCompany: boolean;
  public expertDocuments: ReadonlyArray<ProfileDocument> = [];
  public readonly avatarSize = AvatarSizeEnum.X_156;
  constructor(protected route: ActivatedRoute, protected injector: Injector) {
    super(injector);
    this.route.data
      .pipe(
        takeUntil(this.destroyed$),
        pluck('expert'),
      )
      .subscribe((data: IExpertCompanyDashboardResolverData<IExpertProfile>) => {
        this.avatarToken = data.profile.expertProfileView.expertProfile.avatar;
        this.name = data.profile.expertProfileView.expertProfile.name;
        this.description = data.profile.expertProfileView.expertProfile.description;
        this.links =
          (data.profile.getProfileWithDocuments.profile.expertDetails &&
            data.profile.getProfileWithDocuments.profile.expertDetails.links) ||
          [];
        this.isOwnProfile = data.isOwnProfile;
        this.consultations = data.profile.expertProfileView.employments;
        this.expertDocuments = data.profile.expertProfileView.expertProfile.documents;
        this.expertId = data.profile.expertProfileView.expertProfile.id;
        this.isLogged = data.isLogged;
        this.isCompany = data.isCompany;
      });
  }
  /**
   * callback when edit profile is triggered.
   * Modal resolves to true if user changes something.
   */
  public editProfile = (): void => {
    this.openModalWithReload(CreateProfileModalComponent);
  };
  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation = (): void => {
    const payload: ICreateEditConsultationPayload = {
      isExpertConsultation: true,
      isOwnerEmployee: true,
    };
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(CONSULTATIONDETAILS, payload),
    };
    this.openModalWithReload(CreateEditConsultationModalComponent, modalOptions);
  };

  /**
   * callback when openGallery is triggered.
   */
  public onOpenGallery = (): void => {
    this.openGallery(this.expertDocuments);
  };

  /**
   * callback to open consultation detail modal
   */
  public openConsultationDetail = async (serviceId: string, expertId: string): Promise<void> => {
    const modalRef = this.openModal(ConsultationDetailsViewComponent);
    modalRef.componentInstance.expertId = expertId;
    modalRef.componentInstance.serviceId = serviceId;
    modalRef.componentInstance.userType = UserTypeEnum.EXPERT;
    try {
      const closedServiceId: string | undefined = await modalRef.result;
      if (closedServiceId === serviceId) {
        this.reload();
      }
    } catch (result) {
      return;
    }
  };
}
