import { Injectable } from '@angular/core';
import { ExpertProfileView, GetWidget, ViewsService, WidgetService } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { OrganizationProfileView } from '@anymind-ng/api/model/organizationProfileView';

@Injectable()
export class WidgetGeneratorService {
  constructor(private viewsService: ViewsService, private widgetService: WidgetService) {}

  public getExpertProfileWithServices = (profileId: string): Promise<ExpertProfileView> =>
    this.viewsService.getWebExpertProfileRoute(profileId).toPromise();

  public getOrganizationProfilesWithServices = (profileId: string): Promise<OrganizationProfileView> =>
    this.viewsService.getWebOrganizationProfileRoute(profileId).toPromise();

  public generateWidget = (expertId?: string, serviceId?: string): Observable<GetWidget> =>
    this.widgetService.postGenerateWidgetRoute({
      expertId,
      serviceId,
    });
}
