import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ProfileBaseComponent } from '../../common/profile-base.component';
import { IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';
import {
  CreateEditConsultationModalComponent,
  ICreateEditConsultationPayload,
} from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { IOrganizationProfile } from './services/company-profile.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CONSULTATION_DETAILS } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation';
import { ProfileDocument, ProfileWithDocuments, ServiceWithEmployments } from '@anymind-ng/api';
import { Store, select } from '@ngrx/store';
import * as fromCompanyDashboard from './reducers';
import { EditOrganizationModalComponent } from '@platform/shared/components/modals/profile/edit-organization/edit-organization.component';
import { RouterPaths } from '@platform/shared/routes/routes';
import { CompanyProfilePageActions } from './actions';
import { ConsultationDetailActions } from '@platform/shared/components/modals/consultation-details/actions';
import { CompanyConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/company-consultation-details/company-consultation-details.view.component';
import { IOpenCompanyConsultationModal } from '@platform/features/dashboard/components/consultation-company-row/consultation-company-row.component';
import { SeoService } from '@anymind-ng/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'company-profile.view.component.html',
  styleUrls: ['company-profile.view.component.sass'],
})
export class CompanyProfileComponent extends ProfileBaseComponent implements OnInit, OnDestroy {
  public consultations$ = this.store.pipe(select(fromCompanyDashboard.getConsultations));
  public isLoading$ = this.store.pipe(select(fromCompanyDashboard.getIsLoading));
  public data$ = this.store.pipe(select(fromCompanyDashboard.getData));

  constructor(
    protected route: ActivatedRoute,
    protected injector: Injector,
    private store: Store<fromCompanyDashboard.IState>,
    private seoService: SeoService,
    private translate: TranslateService,
  ) {
    super(injector);
  }

  public getAvatarToken(data: IExpertCompanyDashboardResolverData<IOrganizationProfile>): string {
    return data.profile.organization.organizationProfile.avatar;
  }

  public getOrganizationId(data: IExpertCompanyDashboardResolverData<IOrganizationProfile>): string {
    return data.profile.organization.organizationProfile.id;
  }

  public getName(data: IExpertCompanyDashboardResolverData<IOrganizationProfile>): string {
    return data.profile.organization.organizationProfile.name;
  }

  public getDescription(data: IExpertCompanyDashboardResolverData<IOrganizationProfile>): string {
    return data.profile.organization.organizationProfile.description;
  }

  public getOrganizationDocuments(
    data: IExpertCompanyDashboardResolverData<IOrganizationProfile>,
  ): ReadonlyArray<ProfileDocument> {
    return data.profile.organization.organizationProfile.documents;
  }

  public getIsOwnProfile(data: IExpertCompanyDashboardResolverData<IOrganizationProfile>): boolean {
    return data.isOwnProfile;
  }

  public getIsLogged(data: IExpertCompanyDashboardResolverData<IOrganizationProfile>): boolean {
    return data.isLogged;
  }

  public getLinks(data: IExpertCompanyDashboardResolverData<IOrganizationProfile>): ReadonlyArray<string> | undefined {
    return data.profile.profile.profile.links;
  }

  public getProfileId(data: IExpertCompanyDashboardResolverData<IOrganizationProfile>): string {
    return data.profile.organization.organizationProfile.id;
  }

  public getLanguages(data: ReadonlyArray<ServiceWithEmployments>): ReadonlyArray<string> {
    return Array.from(
      data.reduce(
        (acc, cur) => acc.add(`CONSULTATION_LANGUAGE.${cur.service.language.toUpperCase()}`),
        new Set<string>(),
      ),
    );
  }

  public ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroyed$)).subscribe(paramMap => {
      const profileId = paramMap.get(RouterPaths.dashboard.company.profile.params.profileId) || '';
      this.store.dispatch(new CompanyProfilePageActions.LoadProfileAction(profileId));
    });

    this.data$
      .pipe(
        filter(data => data !== undefined),
        take(1),
      )
      .subscribe((data: IExpertCompanyDashboardResolverData<IOrganizationProfile>) => {
        this.setSeoTags(data.profile.organization.organizationProfile);

        const serviceId = this.route.snapshot.queryParamMap.get('serviceId');
        if (serviceId) {
          this.openConsultationDetail({ serviceId, isOwnProfile: data.isOwnProfile });
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
  public onEditProfile(): void {
    this.openModal(EditOrganizationModalComponent).result.then((organizationProfileId: string | undefined) => {
      if (organizationProfileId !== undefined) {
        this.store.dispatch(new CompanyProfilePageActions.UpdateProfileAction(organizationProfileId));
      }
    });
  }

  /**
   * callback when openGallery is triggered.
   */
  public onOpenGallery(organizationDocuments: ReadonlyArray<ProfileDocument>): void {
    this.openGallery(organizationDocuments);
  }

  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation(profileId: string): void {
    const payload: ICreateEditConsultationPayload = {
      isExpertConsultation: false,
      isOwnerEmployee: false,
      profileId,
    };
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(CONSULTATION_DETAILS, payload),
    };
    this.openModal(CreateEditConsultationModalComponent, modalOptions).result.then(
      (action?: ConsultationDetailActions.AddConsultationAction | ConsultationDetailActions.EditConsultationAction) => {
        if (action instanceof ConsultationDetailActions.AddConsultationAction) {
          this.store.dispatch(new CompanyProfilePageActions.AddConsultationAction(action.payload));
        }
      },
    );
  }

  public openConsultationDetail(event: IOpenCompanyConsultationModal): void {
    const modal = this.modalService.open(CompanyConsultationDetailsViewComponent);
    modal.componentInstance.consultationId = event.serviceId;
    modal.componentInstance.isOwnProfile = event.isOwnProfile;
    modal.result.then(this.onConsultationDetailsClose.bind(this), this.onConsultationDetailsClose.bind(this));
  }

  private onConsultationDetailsClose(): void {
    this.data$
      .pipe(
        filter(data => data !== undefined),
        take(1),
      )
      .subscribe((data: IExpertCompanyDashboardResolverData<IOrganizationProfile>) => {
        this.setSeoTags(data.profile.organization.organizationProfile);
      });
  }

  private setSeoTags(profile: ProfileWithDocuments): void {
    const prefix = this.translate.instant('META.COMPANY_NAME_PREFIX');
    const postfix = this.translate.instant('META.COMPANY_NAME_POSTFIX');

    return this.seoService.updateTags({
      title: `${prefix}${profile.name}${postfix}`,
      image: `/assets/images/meta/expert-ogimage.${this.translate.currentLang}.png`,
      description: profile.description,
    });
  }
}
