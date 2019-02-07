// tslint:disable:no-implicit-dependencies
import { NgModule } from '@angular/core';
import { ModalsModule } from '../../modals/modals.module';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { CreateProfileModalComponent } from './create-profile/create-profile.component';
import { ImageCropModalComponent } from './components/basic-profile-data/image-crop/image-crop.component';
import { CreateProfileComponentService } from './create-profile/create-profile.component.service';
import { BasicProfileDataComponent } from './components/basic-profile-data/basic-profile-data.component';
import { ProfileLinksComponent } from './components/profile-links/profile-links.component';
import { AvatarUploaderComponent } from './components/basic-profile-data/avatar-uploader/avatar-uploader.component';
import { AvatarUploaderDirective } from './components/basic-profile-data/avatar-uploader/avatar-uploader.directive';
import { CreateOrganizationModalComponent } from './create-organization/create-organization.component';
import { CreateOrganizationComponentService } from './create-organization/create-organization.component.service';
import { InputsModule } from '../../inputs/inputs.module';
import { UserAvatarModule } from '../../user-avatar/user-avatar.module';
import { CommonModule } from '@angular/common';
import { ProfileLinksComponentService } from '@platform/shared/components/modals/profile/components/profile-links/profile-links.component.service';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule, ButtonModule } from '@platform/shared/components/atomic-components';
import { ExpertClientProfileComponent } from './components/expert-client-profile/expert-client-profile.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { TooltipModule } from '@platform/shared/components/tooltip/tooltip.module';
import { PayoutInvoiceDetailsModule } from '@platform/shared/components/payout-invoice-details/payout-invoice-details.module';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { EditProfileModalComponent } from './edit-profile/edit-profile.component';
import { EditProfileComponentService } from './edit-profile/edit-profile.component.service';
import { EditOrganizationModalComponent } from './edit-organization/edit-organization.component';
import { EditOrganizationComponentService } from './edit-organization/edit-organization.component.service';
import { WarningInformationModule } from '@platform/shared/components/warning-information/warning-information.module';

@NgModule({
  imports: [
    CommonModule,
    ModalsModule,
    InputsModule,
    UserAvatarModule,
    ReactiveFormsModule,
    TooltipModule,
    IconModule,
    ButtonModule,
    PayoutInvoiceDetailsModule,
    StepperModule,
    WarningInformationModule,
  ],
  entryComponents: [
    CreateProfileModalComponent,
    EditProfileModalComponent,
    CreateOrganizationModalComponent,
    EditOrganizationModalComponent,
    ImageCropModalComponent,
  ],
  providers: [
    CreateProfileComponentService,
    EditProfileComponentService,
    CreateOrganizationComponentService,
    EditOrganizationComponentService,
    ProfileLinksComponentService,
  ],
  declarations: [
    BasicProfileDataComponent,
    CreateProfileModalComponent,
    EditProfileModalComponent,
    CreateOrganizationModalComponent,
    EditOrganizationModalComponent,
    ProfileLinksComponent,
    ImageCropModalComponent,
    AvatarUploaderComponent,
    AvatarUploaderDirective,
    FileUploaderComponent,
    ExpertClientProfileComponent,
    CompanyProfileComponent,
  ],
})
export class ProfileModalModule {}
