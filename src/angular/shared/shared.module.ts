import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsServiceProvider } from './providers/ajs-upgraded-providers/ajs-upgraded-providers';
import { CommunicatorModule, CommunicatorService, CommunicatorSessionService } from '@anymind-ng/core';
import { CommunicatorConfigFactory } from './factories/communicator-config/communicator-config.factory';
import { Config } from '../../config';
import { UnsupportedGuard } from './guards/unsupported/unsupported.guard';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommunicatorModule.forRoot(CommunicatorConfigFactory, Config.communicator.reconnectTimeout)
  ],
  declarations: [],
  exports: [],
  providers: [
    EventsServiceProvider,
    CommunicatorService,
    CommunicatorSessionService,
    UnsupportedGuard
  ]
})

export class SharedModule {
}
