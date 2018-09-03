// tslint:disable:no-empty
// tslint:disable:max-line-length
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { PinElementDirective } from '../../directives/pin-element/pin-element.directive';
import { ModalComponent } from './modal/modal.component';
import { ModalHeaderComponent } from './modal/modal-header/modal-header.component';
import { ModalAnimationComponentDirective } from './modal/animation/modal-animation.component.directive';
import { ModalAnimationComponentService } from './modal/animation/modal-animation.animation.service';
import { CreateExpertConsultationModalComponent } from './create-expert-consultation/create-expert-consultation.component';
import { CreateCompanyConsultationModalComponent } from './create-company-consultation/create-company-consultation.component';
import { EmployeesInviteModalComponent } from './employees-invite/employees-invite.component';
import { CsvUploaderComponent } from './employees-invite/csv-uploader/csv-uploader.component';
import { CsvUploaderDirective } from './employees-invite/csv-uploader/csv-uploader.directive';
import { InputsModule } from '../inputs/inputs.module';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';

@NgModule({
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    PinElementDirective,
    ModalAnimationComponentDirective,
    CreateExpertConsultationModalComponent,
    CreateCompanyConsultationModalComponent,
    EmployeesInviteModalComponent,
    CsvUploaderComponent,
    CsvUploaderDirective,
  ],
  entryComponents: [
    CreateExpertConsultationModalComponent,
    CreateCompanyConsultationModalComponent,
    EmployeesInviteModalComponent,
  ],
  providers: [ModalAnimationComponentService],
  imports: [CommonModule, SharedModule, FormsModule, InputsModule, UserAvatarModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    ModalHeaderComponent,
    PinElementDirective,
    CsvUploaderComponent,
    CsvUploaderDirective,
  ],
})
export class ModalsModule {
  constructor() {}
}
