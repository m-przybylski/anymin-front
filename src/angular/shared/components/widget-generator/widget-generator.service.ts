import { Injectable } from '@angular/core';
import {
  GetExpertProfile, GetOrganizationProfile, GetWidget,
  ViewsService, WidgetService
} from '@anymind-ng/api';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WidgetGeneratorService {

  constructor(private viewsService: ViewsService,
              private widgetService: WidgetService) {
  }

  public getExpertProfileWithServices = (profileId: string): Promise<GetExpertProfile> =>
    this.viewsService.getWebExpertProfileRoute(profileId).toPromise()

  public getOrganizationProfilesWithServices = (profileId: string): Promise<GetOrganizationProfile> =>
    this.viewsService.getWebOrganizationProfileRoute(profileId).toPromise()

  public generateWidget = (expertId?: string, serviceId?: string): Observable<GetWidget> =>
    this.widgetService.postGenerateWidgetRoute({
      expertId,
      serviceId
    })
}
