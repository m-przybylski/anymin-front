// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, MoneyToAmount } from '@anymind-ng/core';
import { CommonSettingsService } from 'angularjs/common/services/common-settings/common-settings.service';
import { WidgetService, ServiceService } from '@anymind-ng/api';
import { switchMap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WidgetButtonType } from '../components/generate-widget-button-type/generate-widget-button-type.component';

@Injectable()
export class GenerateWidgetDataService extends Logger {
  private moneyToAmount: MoneyToAmount;
  constructor(
    loggerFactory: LoggerFactory,
    private commonSettingsService: CommonSettingsService,
    private widgetService: WidgetService,
    private serviceService: ServiceService,
  ) {
    super(loggerFactory);
    this.moneyToAmount = new MoneyToAmount(this.loggerService);
  }

  public getWidgetLink(widgetId: string): string {
    return `${this.commonSettingsService.links.widget}?widgetId=${widgetId}`;
  }

  public getWidgetSdkLink(): string {
    return `<script>var d="${
      this.commonSettingsService.links.widgetSdk
    }",t=document.getElementsByTagName("head")[0],s=document.createElement("script");s.src=d,t.appendChild(s);</script>`;
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
          map(getServiceWithEmployees => {
            if (getServiceWithEmployees) {
              const expertDetails = getServiceWithEmployees.employeesDetails.find(
                employmentWithExpertProfile => employmentWithExpertProfile.employeeProfile.id === getWidget.expertId,
              );

              return {
                serviceName: getServiceWithEmployees.serviceDetails.name,
                serviceDesc: getServiceWithEmployees.serviceDetails.description,
                servicePrice: this.moneyToAmount.transform(getServiceWithEmployees.serviceDetails.grossPrice),
                expertName: expertDetails && expertDetails.employeeProfile.name,
                expertAvatar: expertDetails && expertDetails.employeeProfile.avatar,
              };
            }

            return undefined;
          }),
        ),
      ),
    );
  }
}

export interface IGenerateWidgetResolveData {
  serviceName: string;
  serviceDesc: string;
  servicePrice: string;
  expertName: string | undefined;
  expertAvatar: string | undefined;
}
