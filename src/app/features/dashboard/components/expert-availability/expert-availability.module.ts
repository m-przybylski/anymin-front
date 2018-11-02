import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertAvailabilityComponent } from './expert-availablitiy.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ExpertAvailabilityComponent],
  imports: [CommonModule, TranslateModule.forChild()],
  exports: [ExpertAvailabilityComponent],
  providers: [],
})
export class ExpertAvailabilityModule {}
