import { InjectionToken } from '@angular/core';
import { SchedulerLike } from 'rxjs';

export const SCHEDULER = new InjectionToken<SchedulerLike>('Scheduler for rxjs');
