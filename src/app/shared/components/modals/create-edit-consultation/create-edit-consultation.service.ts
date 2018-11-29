import { Injectable } from '@angular/core';
import { ServiceService } from '@anymind-ng/api';
import { GetService } from '@anymind-ng/api/model/getService';
import { PostService } from '@anymind-ng/api/model/postService';
import { PutService } from '@anymind-ng/api/model/putService';
import { filter, switchMap, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { ConfirmationService } from '@platform/shared/components/modals/confirmation/confirmation.service';
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { Config } from '../../../../../config';

@Injectable()
export class CreateEditConsultationService extends Logger {
  private readonly moneyDivider = Config.moneyDivider;
  private readonly lastButOneIndex = 2;

  constructor(
    private serviceService: ServiceService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CreateEditConsultationService'));
  }

  public createService = (service: PostService): Observable<GetService> =>
    this.serviceService.postServiceRoute(service);

  public updateServiceDetails = (serviceId: string, service: PutService): Observable<GetService> =>
    this.serviceService.putServiceRoute(serviceId, service);

  public getCompanyProfit = (value: number, commission: number): number => (value / this.moneyDivider) * commission;

  public getInputPriceModel = (value: number): string => {
    const stringVal = value.toString().replace('.', ',');
    if (stringVal.indexOf(',') === stringVal.length - 1 || stringVal.indexOf(',') === -1) {
      return `${stringVal},00`;
    } else if (stringVal.indexOf(',') === stringVal.length - this.lastButOneIndex) {
      return `${stringVal}0`;
    }

    return stringVal;
  };

  public deleteService = (serviceId: string): Observable<void> =>
    this.confirmationService.confirm('CONSULTATION_DETAILS.DELETE.HEADER', 'CONSULTATION_DETAILS.DELETE.MESSAGE').pipe(
      filter(confirmed => confirmed),
      switchMap(() =>
        this.serviceService.deleteServiceRoute(serviceId).pipe(
          catchError(err => {
            this.alertService.pushDangerAlert('CONSULTATION_DETAILS.ALERT.REMOVE_FAILURE');
            this.loggerService.warn('Cannot remove consultation', err);

            return EMPTY;
          }),
        ),
      ),
    );
}
