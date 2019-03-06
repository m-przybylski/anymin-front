import { NgModule } from '@angular/core';
import { UnsupportedComponent } from './unsupported.component';
import { CommonModule } from '@angular/common';
import { UnsupportedRoutingModule } from './unsupported.routing';
import { SharedModule } from '../../shared/shared.module';
import { SupportedGuard } from '@platform/features/unsupported/supported.guard';
import { UnsupportedGuard } from '@platform/features/unsupported/unsupported.guard';

@NgModule({
  imports: [UnsupportedRoutingModule, SharedModule, CommonModule],
  declarations: [UnsupportedComponent],
  providers: [SupportedGuard, UnsupportedGuard],
})
export class UnsupportedModule {}
