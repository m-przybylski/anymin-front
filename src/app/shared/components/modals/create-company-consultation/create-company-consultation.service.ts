import { Injectable } from '@angular/core';
import { ServiceService } from '@anymind-ng/api';
import { Observable } from 'rxjs/Rx';
import { GetService } from '@anymind-ng/api/model/getService';
import { PostService } from '@anymind-ng/api/model/postService';
import { CommonConfig } from '../../../../../common-config';

@Injectable()
export class CreateCompanyConsultationService {

  private readonly moneyDivider = CommonConfig.getCommonConfig().config.moneyDivider;

  constructor(private serviceService: ServiceService) {
  }

  public createService = (service: PostService): Observable<GetService> =>
    this.serviceService.postServiceRoute(service)

  public getCompanyProfit = (value: number, commission: number): number => (value / this.moneyDivider) * commission;

}
