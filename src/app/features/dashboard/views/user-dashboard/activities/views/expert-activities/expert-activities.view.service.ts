import { FinancesService, GetProfileActivities, GetProfileBalance, ViewsService } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ExpertActivitiesViewService {
  private static readonly activitiesLimit = '10';

  constructor(private financesService: FinancesService, private viewsService: ViewsService) {}

  public getProfilePayment = (): Observable<GetProfileBalance> => this.financesService.getProfileBalanceRoute1();

  public getActivitiesList = (offset: string): Observable<GetProfileActivities> =>
    this.viewsService.getDashboardActivitiesProfileRoute(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      ExpertActivitiesViewService.activitiesLimit,
      offset,
    );
}
