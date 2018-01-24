import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EventsServiceProvider} from './providers/ajs-upgraded-providers/ajs-upgraded-providers';
import {CommunicatorModule, CommunicatorService} from '@anymind-ng/core';
import {CommunicatorConfigFactory} from './factories/communicator-config/communicator-config.factory';
import {Config} from '../../config';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommunicatorModule.forRoot(CommunicatorConfigFactory, Config.ratel.reconnectInterval)
  ],
  declarations: [],
  exports: [],
  providers: [
    EventsServiceProvider,
    CommunicatorService
  ]
})

export class SharedModule {
}
