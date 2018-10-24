import { NgModule } from '@angular/core';

import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalAnimationComponentDirective } from './animation/modal-animation.component.directive';
import { ModalAnimationComponentService } from './animation/modal-animation.animation.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule } from '@platform/shared/components/atomic-components';

@NgModule({
  imports: [CommonModule, TranslateModule, IconModule],
  exports: [ModalComponent, ModalHeaderComponent, ModalAnimationComponentDirective],
  declarations: [ModalComponent, ModalHeaderComponent, ModalAnimationComponentDirective],
  providers: [ModalAnimationComponentService],
})
export class ModalComponentsModule {}
