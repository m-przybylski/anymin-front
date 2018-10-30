import { Component } from '@angular/core';
import { ActivitiesService } from '@platform/features/dashboard/views/user-dashboard/activities/activities.service';
import { Observable } from 'rxjs';
import { GetImportantActivitiesCounters } from '@anymind-ng/api';

@Component({
  selector: 'plat-activities',
  templateUrl: './activities.view.component.html',
  styleUrls: ['./activities.view.component.sass'],
  providers: [ActivitiesService],
})
export class ActivitiesViewComponent {
  public readonly isProductionReady = false;

  public counters: Observable<GetImportantActivitiesCounters>;

  constructor(activitiesService: ActivitiesService) {
    this.counters = activitiesService.getCounters$;
  }
}
