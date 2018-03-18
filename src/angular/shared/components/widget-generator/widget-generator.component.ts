import { Component, OnInit } from '@angular/core';
import
{
  IPrimaryDropdownListElement
} from '../../../../angularjs/common/components/interface/dropdown-primary/dropdown-primary';
import { WidgetGeneratorService } from './widget-generator.service';
import { UserSessionService } from '../../../core/services/user-session/user-session.service';
import { GetOrganizationServiceDetails } from '@anymind-ng/api';

@Component({
  templateUrl: './widget-generator.component.html',
  selector: 'widget-generator'
})
export class WidgetGeneratorComponent implements OnInit {

  public readonly headScript = '<script src="https://widgetpage.com></script>';

  public bodyScript: string;
  public radioModel = 'static';
  public serviceList: IPrimaryDropdownListElement[] = [];
  public expertList: IPrimaryDropdownListElement[] = [];
  public selectedService?: IPrimaryDropdownListElement;

  private expertId?: string;
  private serviceId?: string;
  private profileWithServices: GetOrganizationServiceDetails[] = [];

  constructor(private widgetGeneratorService: WidgetGeneratorService,
              private userSessionService: UserSessionService) {
  }

  public ngOnInit(): void {
    this.userSessionService.getSession().then((session) => {
      if (session.account)
        session.account.isCompany ? this.getCompanyInitializeData(session.account.id)
          : this.getExpertInitializeData(session.account.id);
    });
  }

  public selectRadio = (value: string): void => {
    this.radioModel = value;
    if (this.expertId || this.serviceId) {
      this.generateWidgetCode();
    }
  }

  public selectExpert = (element: IPrimaryDropdownListElement): void => {
    this.expertId = element.value;
    this.reloadServicesDropdown();
    this.generateWidgetCode();
    if (this.serviceList.length > 1 && element.value !== undefined && this.serviceList[0].value !== undefined) {
      this.addAllConsultationOptionToDropdown();
    }
  }

  public selectConsultation = (element: IPrimaryDropdownListElement): void => {
    this.serviceId = element.value;
    this.generateWidgetCode();
    if (this.expertList.length > 1 && element.value !== undefined && this.expertList[0].value !== undefined) {
      this.addAllExpertsOptionToDropdown();
    }
    if (element.value === undefined) this.expertList.shift();
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
      });
  }

  private generateWidgetCode = (): void => {
    this.bodyScript = `<anymind-widget class="${this.radioModel}"
      ${this.expertId ? `expertID="${this.expertId}"` : ''}
      ${this.serviceId ? `serviceID="${this.serviceId}"` : ''}></anymind-widget>`;
  }

  private addAllConsultationOptionToDropdown = (): void => {
    this.serviceList.unshift({
      name: 'Wszystkie konsultacje',
      value: undefined
    });
  }

  private addAllExpertsOptionToDropdown = (): void => {
    this.expertList.unshift({
      name: 'Wszyscy eksperci',
      value: undefined
    });
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
    if (_.find(this.serviceList, (service) => service.value === this.serviceId)) {
     this.selectedService = _.find(this.serviceList, (service) => service.value === this.serviceId);
    } else {
      this.serviceId = undefined;
      this.selectedService = {
        name: 'Wybierz konsultacje',
        value: undefined
      };
    }
  }
}
