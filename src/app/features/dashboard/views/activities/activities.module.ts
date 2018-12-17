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
import { ActivitiesListService } from '@platform/features/dashboard/views/activities/services/activities-list.service';
import { ContentLoaderModule } from '@platform/shared/components/content-loader/content-loader.module';
import { IconModule } from '@platform/shared/components/atomic-components';
import { ActivitiesBalanceComponent } from '@platform/features/dashboard/views/activities/components/activities-balance.component';
import { MoneyDisplayModule } from '@platform/shared/components/money-display/money-display.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardComponentsModule,
    ContentLoaderModule,
    AnymindComponentsModule,
    TranslateModule.forChild(),
    ActivityDetailsModule,
    ActivitiesCounterModule,
    StoreModule.forFeature('activities', reducers),
    EffectsModule.forFeature([ActivitiesEffects]),
    IconModule,
    MoneyDisplayModule,
  ],
  declarations: [ActivitiesComponent, ActivitiesBalanceComponent],
  exports: [ActivitiesComponent],
  providers: [ActivitiesListService],
})
export class ActivitiesModule {}
