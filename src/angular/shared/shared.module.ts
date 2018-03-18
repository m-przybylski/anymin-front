import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsServiceProvider } from './providers/ajs-upgraded-providers/ajs-upgraded-providers';
import { CommunicatorModule, CommunicatorService, CommunicatorSessionService } from '@anymind-ng/core';
import { CommunicatorConfigFactory } from './factories/communicator-config/communicator-config.factory';
import { Config } from '../../config';
import { UnsupportedGuard } from './guards/unsupported/unsupported.guard';
import { WidgetGeneratorComponent } from './components/widget-generator/widget-generator.component';
import { DropdownPrimaryDirective } from './components/dropdown/dropdown.directive';
import { RadioButtonDirective } from './components/radio/radio.directive';
import { WidgetGeneratorService } from './components/widget-generator/widget-generator.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommunicatorModule.forRoot(CommunicatorConfigFactory, Config.communicator.reconnectTimeout)
  ],
  declarations: [
    DropdownPrimaryDirective,
    RadioButtonDirective,
    WidgetGeneratorComponent
  ],
  entryComponents: [WidgetGeneratorComponent],
  providers: [
    EventsServiceProvider,
    CommunicatorService,
    CommunicatorSessionService,
    WidgetGeneratorService,
    UnsupportedGuard
  ]
})

export class SharedModule {
}
