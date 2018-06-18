import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicProfileDataComponent } from '../navbar/edit-profile/basic-profile-data/basic-profile-data.component';
import { ModalComponentEditProfile } from '../navbar/edit-profile/edit-profile.component';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { ProfileLinksComponent } from '../navbar/edit-profile/profile-links/profile-links.component';
import { PinElementDirective } from '../../directives/pin-element/pin-element.directive';
import { InputAddLinkComponent } from '../navbar/edit-profile/profile-links/input-link/input-link.component';
import {
  ChangeNumberComponent
}
  from '../../../features/dashboard/views/user-dashboard/settings/components/change-number/change-number/change-number.component';
import { ModalComponent } from './modal/modal.component';
import { ModalHeaderComponent } from './modal/modal-header/modal-header.component';

@NgModule({
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    BasicProfileDataComponent,
    ModalComponentEditProfile,
    ProfileLinksComponent,
    InputAddLinkComponent,
    PinElementDirective,
    ChangeNumberComponent
  ],
  entryComponents: [ModalComponentEditProfile, ChangeNumberComponent],
  providers: [],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModalsModule {

  constructor() {
  }
}
