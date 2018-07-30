// tslint:disable:no-implicit-dependencies
import { NgModule } from '@angular/core';
import { ModalsModule } from '../../modals/modals.module';
import { UploaderService } from '../../../services/uploader/uploader.service';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { EditProfileModalComponent } from './edit-profile/edit-profile.component';
import { ImageCropModalComponent } from './components/basic-profile-data/image-crop/image-crop.component';
import { EditProfileModalComponentService } from './edit-profile/edit-profile.component.service';
import { BasicProfileDataComponent } from './components/basic-profile-data/basic-profile-data.component';
import { ProfileLinksComponent } from './components/profile-links/profile-links.component';
import { AvatarUploaderComponent } from './components/basic-profile-data/avatar-uploader/avatar-uploader.component';
import { AvatarUploaderDirective } from './components/basic-profile-data/avatar-uploader/avatar-uploader.directive';
import { CreateOrganizationModalComponent } from './create-organization/create-organization.component';
import { CreateOrganizationModalComponentService } from './create-organization/create-organization.component.service';

@NgModule({
  imports: [ModalsModule],
  entryComponents: [EditProfileModalComponent, CreateOrganizationModalComponent, ImageCropModalComponent],
  providers: [EditProfileModalComponentService, CreateOrganizationModalComponentService, UploaderService],
  declarations: [
    BasicProfileDataComponent,
    EditProfileModalComponent,
    CreateOrganizationModalComponent,
    ProfileLinksComponent,
    ImageCropModalComponent,
    AvatarUploaderComponent,
    AvatarUploaderDirective,
    FileUploaderComponent,
  ],
})
export class ProfileModalModule {}
