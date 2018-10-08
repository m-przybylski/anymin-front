import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertAvailabilityComponent } from './expert-availablitiy.component';
import { ExpertAvailabilityService } from './expert-availablity.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ExpertAvailabilityComponent],
  imports: [CommonModule, TranslateModule.forChild()],
  exports: [ExpertAvailabilityComponent],
  providers: [],
})
export class ExpertAvailabilityModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ExpertAvailabilityModule,
      providers: [ExpertAvailabilityService],
    };
  }
}
