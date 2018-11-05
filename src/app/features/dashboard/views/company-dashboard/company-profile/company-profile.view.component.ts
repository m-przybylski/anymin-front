import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, pluck } from 'rxjs/operators';
import { ProfileBaseComponent } from '../../common/profile-base.component';
import { ServiceWithEmployments } from '@anymind-ng/api';
import { IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';
import { CreateOrganizationModalComponent } from '@platform/shared/components/modals/profile/create-organization/create-organization.component';
import {
  CreateEditConsultationModalComponent,
  ICreateEditConsultationPayload,
} from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { OrganizationProfile } from './services/company-profile-resolver.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CONSULTATIONDETAILS } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';

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
  public consultations: ReadonlyArray<ServiceWithEmployments> = [];
  public links: ReadonlyArray<string>;
  public organizationId: string;
  public organizationDocuments: ReadonlyArray<ProfileDocument> = [];
  private logger: LoggerService;

  constructor(protected route: ActivatedRoute, protected injector: Injector, loggerFactory: LoggerFactory) {
    super(injector);
    this.logger = loggerFactory.createLoggerService('CompanyProfileComponent');
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
        this.consultations = consultations.services;
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
  public editProfile = async (): Promise<void> => {
    const changed: boolean | undefined = await this.openModalResult(CreateOrganizationModalComponent);
    this.reloadIfNeeded(changed);
  };

  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation = async (): Promise<void> => {
    const payload: ICreateEditConsultationPayload = {
      isExpertConsultation: false,
      isOwnerEmployee: false,
    };
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(payload),
    };
    try {
      const changed: boolean | undefined = await this.openModalResult(
        CreateEditConsultationModalComponent,
        modalOptions,
      );
      this.reloadIfNeeded(changed);
    } catch (err) {
      this.logger.error('Error when try to open modal result', err);

      return;
    }
  };

  private setupInjector = (payload: ICreateEditConsultationPayload): Injector =>
    Injector.create({ providers: [{ provide: CONSULTATIONDETAILS, useValue: payload }], parent: this.injector });
}
