import { NgModule } from '@angular/core';

import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalAnimationComponentDirective } from './animation/modal-animation.component.directive';
import { ModalAnimationComponentService } from './animation/modal-animation.animation.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule],
  exports: [ModalComponent, ModalHeaderComponent, ModalAnimationComponentDirective],
  declarations: [ModalComponent, ModalHeaderComponent, ModalAnimationComponentDirective],
  providers: [ModalAnimationComponentService],
})
export class ModalComponentsModule {}
