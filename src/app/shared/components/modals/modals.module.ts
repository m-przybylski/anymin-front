// tslint:disable:no-empty
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { PinElementDirective } from '../../directives/pin-element/pin-element.directive';
// tslint:disable-next-line: max-line-length
import { ChangeNumberComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/change-number/change-number/change-number.component';
import { ModalComponent } from './modal/modal.component';
import { ModalHeaderComponent } from './modal/modal-header/modal-header.component';
import { ModalAnimationComponentDirective } from './modal/animation/modal-animation.component.directive';
import { ModalAnimationComponentService } from './modal/animation/modal-animation.animation.service';
import { CreateExpertConsultationModalComponent }
from './create-expert-consultation/create-expert-consultation.component';
import { CreateCompanyConsultationModalComponent }
from './create-company-consultation/create-company-consultation.component';

@NgModule({
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    PinElementDirective,
    ModalAnimationComponentDirective,
    ChangeNumberComponent,
    CreateExpertConsultationModalComponent,
    CreateCompanyConsultationModalComponent
  ],
  entryComponents: [
    ChangeNumberComponent,
    CreateExpertConsultationModalComponent,
    CreateCompanyConsultationModalComponent
  ],
  providers: [ModalAnimationComponentService],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    ModalHeaderComponent,
    PinElementDirective
  ]
})
export class ModalsModule {

  constructor() {
  }
}
