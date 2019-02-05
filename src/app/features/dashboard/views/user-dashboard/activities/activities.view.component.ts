import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '@platform/features/dashboard/views/user-dashboard/activities/activities.service';
import { Observable } from 'rxjs';
import { GetImportantActivitiesCounters } from '@anymind-ng/api';

@Component({
  selector: 'plat-expert-activities',
  templateUrl: './activities.view.component.html',
  styleUrls: ['./activities.view.component.sass'],
  providers: [ActivitiesService],
})
export class ActivitiesViewComponent implements OnInit {
  public counters: Observable<GetImportantActivitiesCounters>;

  public isExpert = false;

  constructor(private activitiesService: ActivitiesService) {
    this.counters = this.activitiesService.getCounters$;
  }

  public ngOnInit(): void {
    this.activitiesService.hasExpertProfile().subscribe(isExpert => {
      this.isExpert = isExpert;
    });
  }
}
