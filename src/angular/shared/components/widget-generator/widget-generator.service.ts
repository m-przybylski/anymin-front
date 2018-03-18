import { Injectable } from '@angular/core';
import {
  GetExpertProfile, GetOrganizationProfile,
  ViewsService
} from '@anymind-ng/api';

@Injectable()
export class WidgetGeneratorService {

  constructor(private viewsService: ViewsService) {
  }

  public getExpertProfileWithServices = (profileId: string): Promise<GetExpertProfile> =>
    this.viewsService.getWebExpertProfileRoute(profileId).toPromise()

  public getOrganizationProfilesWithServices = (profileId: string): Promise<GetOrganizationProfile> =>
    this.viewsService.getWebOrganizationProfileRoute(profileId).toPromise()
}
