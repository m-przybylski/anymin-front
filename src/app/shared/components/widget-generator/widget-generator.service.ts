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

  public getWidgetSdkLink(widgetSdk: string, widgetId?: string): string {
    // tslint:disable-next-line:max-line-length
    return `<script>(function(d,id,amWidgetId){if(d.getElementById(id))return;var a="${widgetSdk}",t=d.getElementsByTagName("head")[0],s=d.createElement("script");s.id=id;s.setAttribute('data-widgetid',amWidgetId);s.src=a,t.appendChild(s)})(document,'anymind-widget-jssdk'${this.getWidgetSdkParams(
      widgetId,
    )})</script>`;
  }
  private getWidgetSdkParams(widgetId?: string): string {
    return widgetId ? `,'${widgetId}'` : '';
  }
}
