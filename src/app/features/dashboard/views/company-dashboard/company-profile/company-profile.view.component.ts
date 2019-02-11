import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, pluck } from 'rxjs/operators';
import { ProfileBaseComponent } from '../../common/profile-base.component';
import { IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';
import {
  CreateEditConsultationModalComponent,
  ICreateEditConsultationPayload,
} from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { OrganizationProfile } from './services/company-profile-resolver.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CONSULTATION_DETAILS } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { Store, select } from '@ngrx/store';
import * as fromCompanyDashboard from './reducers';
import { EditOrganizationModalComponent } from '@platform/shared/components/modals/profile/edit-organization/edit-organization.component';
@Component({
  templateUrl: 'company-profile.view.component.html',
  styleUrls: ['company-profile.view.component.sass'],
})
export class CompanyProfileComponent extends ProfileBaseComponent {
  public avatarToken: string;
  public name: string;
  public description: string;
  public isOwnProfile: boolean;
  public isLogged: boolean;
  public consultations$ = this.store.pipe(select(fromCompanyDashboard.getConsultations));
  public links: ReadonlyArray<string>;
  public organizationId: string;
  public organizationDocuments: ReadonlyArray<ProfileDocument> = [];

  constructor(
    protected route: ActivatedRoute,
    protected injector: Injector,
    private store: Store<fromCompanyDashboard.ICompanyProfileState>,
  ) {
    super(injector);
    this.route.data
      .pipe(
        takeUntil(this.destroyed$),
        pluck('company'),
      )
      .subscribe((data: IExpertCompanyDashboardResolverData<OrganizationProfile>) => {
        const [consultations, profile] = data.profile;
        this.organizationId = consultations.organizationProfile.id;
        this.avatarToken = consultations.organizationProfile.logo;
        this.name = consultations.organizationProfile.name;
        this.description = consultations.organizationProfile.description;
        this.organizationDocuments = consultations.organizationProfile.documents;
        this.isOwnProfile = data.isOwnProfile;
        this.isLogged = data.isLogged;
        if (typeof profile.profile.organizationDetails !== 'undefined') {
          this.links = profile.profile.organizationDetails.links;
        }
      });
  }

  /**
   * callback when edit profile is triggered.
   * Modal resolves to true if user changes something.
   */
  public onEditProfile(): void {
    this.openModalWithReload(EditOrganizationModalComponent);
  }

  /**
   * callback when openGallery is triggered.
   */
  public onOpenGallery = (): void => {
    this.openGallery(this.organizationDocuments);
  };

  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation = (): void => {
    const payload: ICreateEditConsultationPayload = {
      isExpertConsultation: false,
      isOwnerEmployee: false,
    };
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(CONSULTATION_DETAILS, payload),
    };
    this.openModalWithReload(CreateEditConsultationModalComponent, modalOptions);
  };
}
