import { CommonModule } from '@angular/common';
import { SharedModule } from '@platform/shared/shared.module';
import { NgModule } from '@angular/core';
import { IconModule } from '@platform/shared/components/atomic-components';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateIncomingCallComponent } from '@platform/shared/components/modals/call-modals/incoming-call/incoming-call.component';
import { CreateCallSummaryComponent } from '@platform/shared/components/modals/call-modals/call-summary/call-summary.component';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    InputsModule,
    ModalComponentsModule,
    UserAvatarModule,
    ReactiveFormsModule,
    IconModule,
  ],
  declarations: [CreateIncomingCallComponent, CreateCallSummaryComponent],
  exports: [],
  entryComponents: [CreateIncomingCallComponent, CreateCallSummaryComponent],
})
export class CallModalsModule {}
