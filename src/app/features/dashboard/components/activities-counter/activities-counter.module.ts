import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesCounterComponent } from '@platform/features/dashboard/components/activities-counter/activities-counter.component';

@NgModule({
  declarations: [ActivitiesCounterComponent],
  imports: [CommonModule],
  exports: [ActivitiesCounterComponent],
})
export class ActivitiesCounterModule {}
