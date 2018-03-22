import { Component, OnInit } from '@angular/core';
import
{
  IPrimaryDropdownListElement
} from '../../../../angularjs/common/components/interface/dropdown-primary/dropdown-primary';
import { WidgetGeneratorService } from './widget-generator.service';
import { UserSessionService } from '../../../core/services/user-session/user-session.service';
import { GetOrganizationServiceDetails } from '@anymind-ng/api';
import { CommonSettingsService } from '../../../../angularjs/common/services/common-settings/common-settings.service';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '@anymind-ng/core';

@Component({
  templateUrl: './widget-generator.component.html',
  selector: 'widget-generator',
  styleUrls: ['widget-generator.component.sass']
})
export class WidgetGeneratorComponent implements OnInit {

  public readonly headScript = `<script src="${this.CommonSettingsService.links.widgetSdk}></script>`;

  public bodyScript: string;
  public radioModel = 'static';
  public serviceList: IPrimaryDropdownListElement[] = [];
  public expertList: IPrimaryDropdownListElement[] = [];
  public selectedService?: IPrimaryDropdownListElement;
  public expertId?: string;
  public serviceId?: string;
  public isError = false;
  public isWidgetGenerating = false;

  private profileWithServices: GetOrganizationServiceDetails[] = [];
  private widgetId?: string;

  constructor(private widgetGeneratorService: WidgetGeneratorService,
              private CommonSettingsService: CommonSettingsService,
              private userSessionService: UserSessionService,
              private translate: TranslateService,
              private logger: LoggerService) {
  }

  public ngOnInit(): void {
    this.userSessionService.getSession().then((session) => {
      if (session.account)
        session.account.isCompany ? this.getCompanyInitializeData(session.account.id)
          : this.getExpertInitializeData(session.account.id);
    }, (error) => {
      this.logger.error(error);
    });
  }

  public selectRadio = (value: string): void => {
    this.radioModel = value;
    if (this.widgetId) this.bodyScript = this.generateBodyCode(this.widgetId);
  }

  public generateWidgetCode = (expertId?: string, serviceId?: string): void => {
    this.isWidgetGenerating = true;
    this.widgetGeneratorService.generateWidget(expertId, serviceId).subscribe((widget) => {
      this.isError = false;
      this.widgetId = widget.id;
      this.bodyScript = this.generateBodyCode(widget.id);
    }, (error) => {
      this.isError = true;
      this.isWidgetGenerating = false;
      this.logger.warn(error);
    });
  }

  public selectExpert = (element: IPrimaryDropdownListElement): void => {
    this.expertId = element.value;
    this.reloadServicesDropdown();
    this.isWidgetGenerating = false;
    if (this.serviceList.length > 1 && element.value !== undefined && this.serviceList[0].value !== undefined) {
      this.addAllConsultationOptionToDropdown();
    }
  }

  public selectConsultation = (element: IPrimaryDropdownListElement): void => {
    this.serviceId = element.value;
    this.isWidgetGenerating = false;
    if (this.expertList.length > 1 && element.value !== undefined && this.expertList[0].value !== undefined) {
      this.addAllExpertsOptionToDropdown();
    }
    this.removeAllExpertsOptionFromDropdown(element);
  }

  public copyToClipboard = (textToCopy: string): void => {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(textArea);
    }
  }

  private getExpertInitializeData = (accountId: string): void => {
    this.widgetGeneratorService.getExpertProfileWithServices(accountId).then((profileWithServices) => {
      this.expertList = [{
        name: profileWithServices.profile.expertDetails ? profileWithServices.profile.expertDetails.name : '',
        value: profileWithServices.profile.id
      }];
      this.serviceList = profileWithServices.services.map((serviceWithProfile) => ({
        name: serviceWithProfile.service.name,
        value: serviceWithProfile.service.id
      }));
    }, (error) => {
      this.logger.error(error);
    });
  }

  private getCompanyInitializeData = (accountId: string): void => {
    this.widgetGeneratorService.getOrganizationProfilesWithServices(accountId)
      .then((profileWithServices) => {
        this.expertList = _.uniqBy(_.flatMap(profileWithServices.services,
          (profileWithServices) => profileWithServices.employees.map((employee) => ({
            name: employee.name,
            value: employee.id
          }))), 'value');
        this.serviceList = profileWithServices.services.map((profileWithServices) => ({
          name: profileWithServices.service.name,
          value: profileWithServices.service.id
        }));
        this.profileWithServices = profileWithServices.services;
      }, (error) => {
        this.logger.error(error);
      });
  }

  private addAllConsultationOptionToDropdown = (): void => {
    this.serviceList.unshift({
      name: this.translate.instant('DASHBOARD.EXPERT_ACCOUNT.WIDGET.SELECT_SECTION_SERVICES_DROPDOWN_ALL_OPTION'),
      value: undefined
    });
  }

  private addAllExpertsOptionToDropdown = (): void => {
    this.expertList.unshift({
      name: this.translate.instant('DASHBOARD.EXPERT_ACCOUNT.WIDGET.SELECT_SECTION_EXPERTS_DROPDOWN_ALL_OPTION'),
      value: undefined
    });
  }

  private generateBodyCode = (widgetId?: string): string => `<button
      data-anymind-widget="${widgetId}"
      class="anymind-button${this.radioModel === 'flatten' ? ' anymind-floating' : ''}"></button>`

  private removeAllExpertsOptionFromDropdown = (element: IPrimaryDropdownListElement): void => {
    if (element.value === undefined) this.expertList.shift();
  }

  private reloadServicesDropdown = (): void => {
    this.serviceList = this.expertId !== undefined ?
      this.profileWithServices.filter((service) => _.find(service.employees, (employee) =>
        employee.id === this.expertId)).map((serviceWithEmployees) => ({
        name: serviceWithEmployees.service.name,
        value: serviceWithEmployees.service.id
      })) : this.profileWithServices.map((profileWithServices) => ({
        name: profileWithServices.service.name,
        value: profileWithServices.service.id
      }));
    this.setDropdownSelectedService();
  }

  private setDropdownSelectedService = (): void => {
    if (_.find(this.serviceList, (service) => service.value === this.serviceId)) {
      this.selectedService = _.find(this.serviceList, (service) => service.value === this.serviceId);
    } else {
      this.serviceId = undefined;
      this.selectedService = {
        name:
          this.translate.instant('DASHBOARD.EXPERT_ACCOUNT.WIDGET.SELECT_SECTION_SERVICES_DROPDOWN_PLACEHOLDER'),
        value: undefined
      };
    }
  }
}
