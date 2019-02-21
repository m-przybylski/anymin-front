import { Component, Injector, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { EmploymentWithService, ProfileDocument } from '@anymind-ng/api';
import { takeUntil } from 'rxjs/operators';
import { ProfileBaseComponent } from '../../common/profile-base.component';
import { IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import {
  CreateEditConsultationModalComponent,
  ICreateEditConsultationPayload,
} from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { CONSULTATION_DETAILS } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { IExpertProfile } from './services/expert-dashboard.service';
import { EditProfileModalComponent } from '@platform/shared/components/modals/profile/edit-profile/edit-profile.component';
import { Store, select } from '@ngrx/store';
import * as fromExpertDashboard from './reducers';
import { ExpertDashboardActions } from './actions';
import * as fromRoot from '@platform/reducers';
import { RouterPaths } from '@platform/shared/routes/routes';

@Component({
  selector: 'plat-expert-dashboard',
  templateUrl: './expert-dashboard.view.component.html',
  styleUrls: ['./expert-dashboard.view.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertDashboardComponent extends ProfileBaseComponent implements OnInit {
  public readonly avatarSize = AvatarSizeEnum.X_156;
  public isLoading$ = this.store.pipe(select(fromExpertDashboard.getIsLoading));
  public data$ = this.store.pipe(select(fromExpertDashboard.getProfileData));
  constructor(protected route: ActivatedRoute, protected injector: Injector, private store: Store<fromRoot.IState>) {
    super(injector);
  }

  public getAvatarToken(data: IExpertCompanyDashboardResolverData<IExpertProfile>): string {
    return data.profile.expertProfileView.expertProfile.avatar;
  }
  public getName(data: IExpertCompanyDashboardResolverData<IExpertProfile>): string {
    return data.profile.expertProfileView.expertProfile.name;
  }
  public getDescription(data: IExpertCompanyDashboardResolverData<IExpertProfile>): string {
    return data.profile.expertProfileView.expertProfile.description;
  }
  public getLinks(data: IExpertCompanyDashboardResolverData<IExpertProfile>): ReadonlyArray<string> {
    return (
      (data.profile.getProfileWithDocuments.profile.expertDetails &&
        data.profile.getProfileWithDocuments.profile.expertDetails.links) ||
      []
    );
  }
  public getIsOwnProfile(data: IExpertCompanyDashboardResolverData<IExpertProfile>): boolean {
    return data.isOwnProfile;
  }
  public getConsultations(
    data: IExpertCompanyDashboardResolverData<IExpertProfile>,
  ): ReadonlyArray<EmploymentWithService> {
    return data.profile.expertProfileView.employments;
  }
  public getExpertDocuments(data: IExpertCompanyDashboardResolverData<IExpertProfile>): ReadonlyArray<ProfileDocument> {
    return data.profile.expertProfileView.expertProfile.documents;
  }
  public getExpertId(data: IExpertCompanyDashboardResolverData<IExpertProfile>): string {
    return data.profile.expertProfileView.expertProfile.id;
  }
  public getIsLogged(data: IExpertCompanyDashboardResolverData<IExpertProfile>): boolean {
    return data.isLogged;
  }
  public getIsCompany(data: IExpertCompanyDashboardResolverData<IExpertProfile>): boolean {
    return data.isCompany;
  }

  public ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroyed$)).subscribe(paramMap => {
      const expertId = paramMap.get(RouterPaths.dashboard.user.profile.params.expertId) || '';
      this.store.dispatch(new ExpertDashboardActions.LoadExpertDashboardAction(expertId));
    });
  }
  /**
   * callback when edit profile is triggered.
   * Modal resolves to true if user changes something.
   */
  public editProfile(expertId: string): void {
    this.openModal(EditProfileModalComponent).result.then((changed: any) => {
      if (typeof changed === 'boolean' && changed) {
        this.store.dispatch(new ExpertDashboardActions.ReloadExpertDashboardAfterEditProfileAction(expertId));
      }
    });
  }
  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation(expertId: string): void {
    const payload: ICreateEditConsultationPayload = {
      isExpertConsultation: true,
      isOwnerEmployee: true,
    };
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(CONSULTATION_DETAILS, payload),
    };
    this.openModal(CreateEditConsultationModalComponent, modalOptions).result.then((changed: any) => {
      if (typeof changed === 'boolean' && changed) {
        this.store.dispatch(new ExpertDashboardActions.ReloadExpertDashboardAfterEditProfileAction(expertId));
      }
    });
  }

  /**
   * callback when openGallery is triggered.
   */
  public onOpenGallery(expertDocuments: ReadonlyArray<ProfileDocument>): void {
    this.openGallery(expertDocuments);
  }

  /**
   * callback to open consultation detail modal
   */
  public async openConsultationDetail(serviceId: string, expertId: string): Promise<void> {
    const modalRef = this.openModal(ConsultationDetailsViewComponent);
    modalRef.componentInstance.expertId = expertId;
    modalRef.componentInstance.serviceId = serviceId;
    modalRef.componentInstance.userType = UserTypeEnum.EXPERT;
    try {
      const closedServiceId: string | undefined = await modalRef.result;
      /**
       * once serviceId is returned from the result of closing modal
       * it means that there was edit/delete/leave operation performed
       * and there is a need to make a page refresh. To minimize network load
       * and make it more redux friendly there is an area to improve by updating
       * only selected service. For now make a full page refresh
       */
      if (closedServiceId === serviceId) {
        this.store.dispatch(new ExpertDashboardActions.ReloadExpertDashboardAfterConsultationsAction(expertId));
      }
    } catch (result) {
      return;
    }
  }
}
