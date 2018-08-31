import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, pluck } from 'rxjs/operators';
import { ProfileBaseComponent } from '../../common/profile-base.component';
import { ServiceWithEmployments } from '@anymind-ng/api';
import { IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';
import { CreateOrganizationModalComponent } from '../../../../../shared/components/modals/profile/create-organization/create-organization.component';
import { CreateCompanyConsultationModalComponent } from '../../../../../shared/components/modals/create-company-consultation/create-company-consultation.component';
import { OrganizationProfile } from './services/company-profile-resolver.service';

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
  public consultations: ReadonlyArray<ServiceWithEmployments>;
  public links: ReadonlyArray<string>;

  constructor(protected route: ActivatedRoute, injector: Injector) {
    super(injector);
    this.route.data
      .pipe(
        takeUntil(this.destroyed$),
        pluck('company'),
      )
      .subscribe((data: IExpertCompanyDashboardResolverData<OrganizationProfile>) => {
        const [consultations, profile] = data.profile;
        this.avatarToken = consultations.organizationProfile.logo;
        this.name = consultations.organizationProfile.name;
        this.description = consultations.organizationProfile.description;
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
    const changed: boolean | undefined = await this.openModal(CreateOrganizationModalComponent);
    this.realoadIfNeeded(changed);
  };

  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation = async (): Promise<void> => {
    const changed: boolean | undefined = await this.openModal(CreateCompanyConsultationModalComponent);
    this.realoadIfNeeded(changed);
  };
}
