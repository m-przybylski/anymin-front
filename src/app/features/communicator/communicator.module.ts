import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CommunicatorComponent } from './communicator.component';
import { CommunicatorRoutingModule } from './communicator.routing.module';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';
import { CommunicatorGuard } from './communicator.guard';
import { IconModule } from '@platform/shared/components/atomic-components';

@NgModule({
  declarations: [CommunicatorComponent],
  imports: [CommonModule, SharedModule, AngularJsProvidersModule, CommunicatorRoutingModule, IconModule],
  providers: [CommunicatorGuard],
})
export class CommunicatorViewModule {}
