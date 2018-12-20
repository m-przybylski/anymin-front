import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalAnimationComponentDirective } from './animation/modal-animation.component.directive';
import { ModalAnimationComponentService } from './animation/modal-animation.animation.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule } from '@platform/shared/components/atomic-components';
import { SharedModule } from '@platform/shared/shared.module';
import { PinElementDirective } from '@platform/shared/directives/pin-element/pin-element.directive';
import { StickyFooterDirective } from '@platform/shared/components/modals/modal/sticky-modal-footer.directive';
import { StickyModalFooterService } from '@platform/shared/components/modals/modal/animation/sticky-modal-footer.directive.service';

@NgModule({
  imports: [CommonModule, TranslateModule, IconModule, SharedModule],
  exports: [ModalComponent, ModalHeaderComponent, ModalAnimationComponentDirective],
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    ModalAnimationComponentDirective,
    PinElementDirective,
    StickyFooterDirective,
  ],
  providers: [ModalAnimationComponentService, StickyModalFooterService],
})
export class ModalComponentsModule {}
