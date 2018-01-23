import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EventsServiceProvider} from './providers/ajs-upgraded-providers/ajs-upgraded-providers';
import {CommunicatorService} from './services/communicator/communicator.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
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
