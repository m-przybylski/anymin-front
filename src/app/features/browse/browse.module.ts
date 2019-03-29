import { NgModule } from '@angular/core';
import { BrowseRoutingModule } from './browse.routing.module';
import { BrowseComponent } from './browse.component';
import { NavbarModule } from '@platform/features/dashboard/components/navbar/navbar.module';
import { GenerateWidgetService } from '@platform/shared/components/modals/generate-widget/services/generate-widget.service';

@NgModule({
  declarations: [BrowseComponent],
  providers: [GenerateWidgetService],
  imports: [BrowseRoutingModule, NavbarModule],
})
export class BrowseModule {}
