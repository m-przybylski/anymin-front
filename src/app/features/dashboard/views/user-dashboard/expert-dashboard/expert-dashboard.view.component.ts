import { Component, Injector, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { EmploymentWithService, ProfileDocument } from '@anymind-ng/api';
import { takeUntil, map, filter } from 'rxjs/operators';
import { ProfileBaseComponent } from '../../common/profile-base.component';
import { IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';
import { ConsultationDetailsModalComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import {
  CreateEditConsultationModalComponent,
  ICreateEditConsultationPayload,
} from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { CONSULTATION_DETAILS } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { IExpertProfile, ExpertDashboardService } from './services/expert-dashboard.service';
import { EditProfileModalComponent } from '@platform/shared/components/modals/profile/edit-profile/edit-profile.component';
import { Store, select } from '@ngrx/store';
import * as fromExpertDashboard from './reducers';
import { ExpertDashboardActions } from './actions';
import * as fromRoot from '@platform/reducers';
import { RouterPaths } from '@platform/shared/routes/routes';
import { IS_EXPERT_FORM } from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { SeoService } from '@anymind-ng/core';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    protected route: ActivatedRoute,
    protected injector: Injector,
    private expertDashboardService: ExpertDashboardService,
    private seoService: SeoService,
    private translate: TranslateService,
    private store: Store<fromRoot.IState>,
  ) {
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
    return data.profile.getProfileWithDocuments.profile.links;
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

  public getProfileId(data: IExpertCompanyDashboardResolverData<IExpertProfile>): string {
    return data.profile.getProfileWithDocuments.profile.id;
  }

  public getExpertAccountId(data: IExpertCompanyDashboardResolverData<IExpertProfile>): string {
    return data.profile.expertProfileView.expertProfile.accountId;
  }

  public ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroyed$)).subscribe(paramMap => {
      const expertId = paramMap.get(RouterPaths.dashboard.user.profile.params.expertId) || '';
      this.store.dispatch(new ExpertDashboardActions.LoadExpertDashboardAction(expertId));
    });

    this.data$.pipe(takeUntil(this.destroyed$)).subscribe(data => {
      if (data) {
        const profile = data.profile.expertProfileView.expertProfile;
        this.seoService.updateTags({
          title: `${profile.name}${this.translate.instant('META.EXPERT_NAME_POSTFIX')}`,
          image: `/assets/images/meta/expert-ogimage.${this.translate.currentLang}.png`,
          description: profile.description,
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.seoService.updateTags({});
  }

  /**
   * callback when edit profile is triggered.
   * Modal resolves to true if user changes something.
   */
  public editProfile(expertId: string): void {
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(IS_EXPERT_FORM, true),
    };

    this.openModal(EditProfileModalComponent, modalOptions).result.then((changed: any) => {
      if (typeof changed === 'boolean' && changed) {
        this.store.dispatch(new ExpertDashboardActions.ReloadExpertDashboardAfterEditProfileAction(expertId));
      }
    });
  }

  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation(profileId: string): void {
    const payload: ICreateEditConsultationPayload = {
      isExpertConsultation: true,
      isOwnerEmployee: true,
      profileId,
    };
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(CONSULTATION_DETAILS, payload),
    };
    const createEditConsultationResult = this.openModal(CreateEditConsultationModalComponent, modalOptions).result;
    this.expertDashboardService.addConsultation(
      createEditConsultationResult,
      this.data$.pipe(
        filter(data => data !== undefined),
        map((data: IExpertCompanyDashboardResolverData<IExpertProfile>) => data.profile.getProfileWithDocuments),
      ),
    );
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
  public async openConsultationDetail(serviceId: string, expertId: string, expertAccountId: string): Promise<void> {
    const modalRef = this.openModal(ConsultationDetailsModalComponent);
    modalRef.componentInstance.expertId = expertId;
    modalRef.componentInstance.expertAccountId = expertAccountId;
    modalRef.componentInstance.serviceId = serviceId;
    modalRef.componentInstance.userType = UserTypeEnum.EXPERT;
  }
}
