// tslint:disable:no-implicit-dependencies
import { NgModule } from '@angular/core';
import { ModalsModule } from '../../modals/modals.module';
import { UploaderService } from '../../../services/uploader/uploader.service';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { CreateProfileModalComponent } from './create-profile/create-profile.component';
import { ImageCropModalComponent } from './components/basic-profile-data/image-crop/image-crop.component';
import { CreateProfileModalComponentService } from './create-profile/create-profile.component.service';
import { BasicProfileDataComponent } from './components/basic-profile-data/basic-profile-data.component';
import { ProfileLinksComponent } from './components/profile-links/profile-links.component';
import { AvatarUploaderComponent } from './components/basic-profile-data/avatar-uploader/avatar-uploader.component';
import { AvatarUploaderDirective } from './components/basic-profile-data/avatar-uploader/avatar-uploader.directive';
import { CreateOrganizationModalComponent } from './create-organization/create-organization.component';
import { CreateOrganizationModalComponentService } from './create-organization/create-organization.component.service';
import { InputsModule } from '../../inputs/inputs.module';
import { UserAvatarModule } from '../../user-avatar/user-avatar.module';
import { CommonModule } from '@angular/common';
import { ProfileLinksComponentService } from '@platform/shared/components/modals/profile/components/profile-links/profile-links.component.service';

@NgModule({
  imports: [CommonModule, ModalsModule, InputsModule, UserAvatarModule],
  entryComponents: [CreateProfileModalComponent, CreateOrganizationModalComponent, ImageCropModalComponent],
  providers: [
    CreateProfileModalComponentService,
    CreateOrganizationModalComponentService,
    UploaderService,
    ProfileLinksComponentService,
  ],
  declarations: [
    BasicProfileDataComponent,
    CreateProfileModalComponent,
    CreateOrganizationModalComponent,
    ProfileLinksComponent,
    ImageCropModalComponent,
    AvatarUploaderComponent,
    AvatarUploaderDirective,
    FileUploaderComponent,
  ],
})
export class ProfileModalModule {}
