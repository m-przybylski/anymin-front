import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { PinElementDirective } from '../../directives/pin-element/pin-element.directive';
// tslint:disable-next-line: max-line-length
import { ChangeNumberComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/change-number/change-number/change-number.component';
import { ModalComponent } from './modal/modal.component';
import { ModalHeaderComponent } from './modal/modal-header/modal-header.component';

@NgModule({
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    PinElementDirective,
    ChangeNumberComponent
  ],
  entryComponents: [ChangeNumberComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [
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
