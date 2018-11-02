// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, MoneyToAmount } from '@anymind-ng/core';
import { CommonSettingsService } from 'angularjs/common/services/common-settings/common-settings.service';
import { WidgetService, ServiceService, GetServiceWithEmployees } from '@anymind-ng/api';
import { switchMap, map, filter } from 'rxjs/operators';
import { Observable, of, EMPTY, defer } from 'rxjs';
import { WidgetButtonType } from '../components/generate-widget-button-type/generate-widget-button-type.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class GenerateWidgetDataService extends Logger {
  /**
   * This object is used to provide some data when there is noone
   * assigned to the consultation. It may happen that there are pending
   * invitations and none of thosee has been accepted.
   */
  private readonly dummyExpertName = 'GENERATE_WIDGET_MODAL.CONTENT.DUMMY_NAME';

  private moneyToAmount: MoneyToAmount;
  constructor(
    private commonSettingsService: CommonSettingsService,
    private widgetService: WidgetService,
    private serviceService: ServiceService,
    private translateService: TranslateService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('GenerateWidgetDataService'));
    this.moneyToAmount = new MoneyToAmount(this.loggerService);
  }

  public getWidgetLink(widgetId: string): string {
    return `${this.commonSettingsService.links.widget}/${widgetId}`;
  }

  public getWidgetSdkLink(widgetId?: string): string {
    return `<script>(function(d,id,amWidgetId){if(d.getElementById(id))return;var a="${
      this.commonSettingsService.links.widgetSdk
    }",t=d.getElementsByTagName("head")[0],s=d.createElement("script");s.id=id;s.setAttribute('data-widgetid',amWidgetId);s.src=a,t.appendChild(s)})(document,'anymind-widget-jssdk','${
      widgetId ? widgetId : ''
    }')</script>`;
  }

  public getButtonCode(widgetId: string, buttonType: WidgetButtonType): string {
    return `<button data-anymind-widget="${widgetId}" class="anymind-button${
      buttonType === WidgetButtonType.FLOATING ? ' anymind-floating' : ''
    }"></button>`;
  }

  public resolve(widgetId: string): Observable<IGenerateWidgetResolveData | undefined> {
    return this.widgetService.getWidgetRoute(widgetId).pipe(
      filter(getWidget => typeof getWidget.serviceId !== 'undefined'),
      switchMap(getWidget =>
        this.serviceService.postServiceWithEmployeesRoute({ serviceIds: [getWidget.serviceId as string] }).pipe(
          map(getServiceWithEmployeesList =>
            getServiceWithEmployeesList.find(
              getServiceWithEmployees => getServiceWithEmployees.serviceDetails.id === getWidget.serviceId,
            ),
          ),
          switchMap(getServiceWithEmployees => {
            if (getServiceWithEmployees) {
              const foundExpertDetails = getServiceWithEmployees.employeesDetails.find(
                employmentWithExpertProfile => employmentWithExpertProfile.employeeProfile.id === getWidget.expertId,
              );

              /**
               * expertId is not required. If expertId === undefined pick first from the list
               */
              const expertDetails = foundExpertDetails
                ? foundExpertDetails
                : getServiceWithEmployees.employeesDetails.length
                  ? getServiceWithEmployees.employeesDetails[0]
                  : undefined;

              return defer(
                () =>
                  expertDetails !== undefined
                    ? of(
                        this.mapServiceAndExpert(
                          getServiceWithEmployees,
                          expertDetails.employeeProfile.name,
                          expertDetails.employeeProfile.avatar,
                        ),
                      )
                    : this.translateService
                        .get(this.dummyExpertName)
                        .pipe(
                          map((expertName: string) => this.mapServiceAndExpert(getServiceWithEmployees, expertName)),
                        ),
              );
            }

            this.loggerService.warn(`Backend did not respond to serviceId: ${getWidget.serviceId}`);

            return EMPTY;
          }),
        ),
      ),
    );
  }

  private mapServiceAndExpert = (
    getServiceWithEmployees: GetServiceWithEmployees,
    expertName: string,
    expertAvatar?: string,
  ): IGenerateWidgetResolveData => ({
    serviceName: getServiceWithEmployees.serviceDetails.name,
    serviceDesc: getServiceWithEmployees.serviceDetails.description,
    servicePrice: this.moneyToAmount.transform(getServiceWithEmployees.serviceDetails.grossPrice),
    expertName,
    expertAvatar,
  });
}

export interface IGenerateWidgetResolveData {
  serviceName: string;
  serviceDesc: string;
  servicePrice: string;
  expertName: string | undefined;
  expertAvatar: string | undefined;
}
