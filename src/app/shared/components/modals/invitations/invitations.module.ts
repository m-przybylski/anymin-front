import { NgModule } from '@angular/core';
import { EmployeesInviteModalComponent } from './employees-invite/employees-invite.component';
import { CsvUploaderComponent } from './employees-invite/csv-uploader/csv-uploader.component';
import { CsvUploaderDirective } from './employees-invite/csv-uploader/csv-uploader.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';
import { SharedModule } from '@platform/shared/shared.module';
import { ModalComponentsModule } from '../modal/modal.components.module';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { AcceptRejectInvitationModalComponent } from './accept-reject-invitation/accept-reject-invitation.component';
import { IconModule, ButtonModule } from '@platform/shared/components/atomic-components';
import { TranslateModule } from '@ngx-translate/core';
import { ConsultationDetailsModule } from '../consultation-details/consultation-details.view.module';

@NgModule({
  imports: [
    IconModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    InputsModule,
    SharedModule,
    ModalComponentsModule,
    UserAvatarModule,
    TranslateModule.forChild(),
    ConsultationDetailsModule,
  ],
  entryComponents: [AcceptRejectInvitationModalComponent, EmployeesInviteModalComponent],
  declarations: [
    AcceptRejectInvitationModalComponent,
    EmployeesInviteModalComponent,
    CsvUploaderComponent,
    CsvUploaderDirective,
  ],
})
export class InvitationsModalsModule {}
