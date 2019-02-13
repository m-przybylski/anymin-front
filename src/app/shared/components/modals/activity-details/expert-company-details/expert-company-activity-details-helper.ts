import { InjectionToken } from '@angular/core';
import { IProfileActivitiesWithStatus } from '@platform/features/dashboard/views/activities/activities.component';

export const ACTIVITY_DETAILS_DATA = new InjectionToken<IProfileActivitiesWithStatus>('Activity details data');
