import { NgModule } from '@angular/core';
import { UnsupportedComponent } from './unsupported.component';
import { CommonModule } from '@angular/common';
import { UnsupportedRoutingModule } from './unsupported.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    UnsupportedRoutingModule,
    SharedModule,
    CommonModule
  ],
  declarations: [
    UnsupportedComponent
  ]
})

export class UnsupportedModule {
}
