import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicProfileDataComponent } from '../navbar/edit-profile/basic-profile-data/basic-profile-data.component';
import { ModalComponentEditProfile } from '../navbar/edit-profile/edit-profile.component';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { ProfileLinksComponent } from '../navbar/edit-profile/profile-links/profile-links.component';
import { PinElementDirective } from '../../directives/pin-element/pin-element.directive';
import { InputAddLinkComponent } from '../navbar/edit-profile/profile-links/input-link/input-link.component';

@NgModule({
  declarations: [
    BasicProfileDataComponent,
    ModalComponentEditProfile,
    ProfileLinksComponent,
    InputAddLinkComponent,
    PinElementDirective
  ],
  entryComponents: [ModalComponentEditProfile],
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
