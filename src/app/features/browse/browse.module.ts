import { NgModule } from '@angular/core';
import { BrowseRoutingModule } from './browse.routing.module';
import { BrowseComponent } from './browse.component';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';

@NgModule({
  declarations: [BrowseComponent],
  imports: [BrowseRoutingModule, AngularJsProvidersModule],
})
export class BrowseModule {}
