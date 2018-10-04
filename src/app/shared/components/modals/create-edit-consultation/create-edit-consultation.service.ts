import { Injectable } from '@angular/core';
import { ServiceService } from '@anymind-ng/api';
import { Observable } from 'rxjs/Rx';
import { GetService } from '@anymind-ng/api/model/getService';
import { PostService } from '@anymind-ng/api/model/postService';
import { PutService } from '@anymind-ng/api/model/putService';

@Injectable()
export class CreateEditConsultationService {
  private readonly moneyDivider = 100;

  constructor(private serviceService: ServiceService) {}

  public createService = (service: PostService): Observable<GetService> =>
    this.serviceService.postServiceRoute(service);

  public updateServiceDetails = (serviceId: string, service: PutService): Observable<GetService> =>
    this.serviceService.putServiceRoute(serviceId, service);

  public getCompanyProfit = (value: number, commission: number): number => (value / this.moneyDivider) * commission;
}
