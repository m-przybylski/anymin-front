import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponentsModule } from '@platform/features/dashboard/components/components.module';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivityDetailsModule } from '@platform/shared/components/modals/activity-details/activity-details.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ActivitiesCounterModule } from '@platform/features/dashboard/components/activities-counter/activities-counter.module';
import { ActivitiesComponent } from '@platform/features/dashboard/views/activities/activities.component';
import { ActivitiesEffects } from '@platform/features/dashboard/views/activities/effects/activities.effects';
import { reducers } from '@platform/features/dashboard/views/activities/reducers';
import { ActivitiesGuard } from '@platform/features/dashboard/views/activities/activities.guard';
import { ActivitiesListService } from '@platform/features/dashboard/views/activities/services/activities-list.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardComponentsModule,
    AnymindComponentsModule,
    TranslateModule,
    ActivityDetailsModule,
    ActivitiesCounterModule,
    StoreModule.forFeature('activities', reducers),
    EffectsModule.forFeature([ActivitiesEffects]),
  ],
  declarations: [ActivitiesComponent],
  exports: [ActivitiesComponent],
  providers: [ActivitiesGuard, ActivitiesListService],
})
export class ActivitiesModule {}
