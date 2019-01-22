import { NgModule } from '@angular/core';
import { CreateCallService } from '@platform/shared/services/client-call/create-call.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientCallService } from '@anymind-ng/core';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [],
  exports: [],
  providers: [ClientCallService, CreateCallService],
})
export class CreateCallModule {}
