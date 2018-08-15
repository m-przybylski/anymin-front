import { Injectable } from '@angular/core';
import { ServiceService } from '@anymind-ng/api';
import { Observable } from 'rxjs/Rx';
import { GetService } from '@anymind-ng/api/model/getService';
import { PostService } from '@anymind-ng/api/model/postService';

@Injectable()
export class CreateCompanyConsultationService {

  private readonly moneyDivider = 100;

  constructor(private serviceService: ServiceService) {
  }

  public createService = (service: PostService): Observable<GetService> =>
    this.serviceService.postServiceRoute(service)

  public getCompanyProfit = (value: number, commission: number): number => (value / this.moneyDivider) * commission;

}
