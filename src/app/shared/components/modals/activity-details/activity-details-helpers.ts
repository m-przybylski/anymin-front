import { InjectionToken } from '@angular/core';
import { IProfileActivitiesWithStatus } from '@platform/features/dashboard/views/user-dashboard/activities/views/expert-activities/expert-activities.view.component';

export const ACTIVITY_DETAILS_DATA = new InjectionToken<IProfileActivitiesWithStatus>('Activity details data');
