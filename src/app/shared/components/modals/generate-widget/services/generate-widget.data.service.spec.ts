import { TestBed } from '@angular/core/testing';
import { provideMockFactoryLogger } from 'testing/testing';
import { ServiceService, WidgetService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { cold } from 'jasmine-marbles';
import { GenerateWidgetDataService } from './generate-widget.data.service';
import { TranslateService } from '@ngx-translate/core';

describe('GenerateWidgetDataService', () => {
  let service: GenerateWidgetDataService;

  const widgetService: WidgetService = Deceiver(WidgetService, { getWidgetRoute: jasmine.createSpy('getWidgetRoute') });
  const serviceService: ServiceService = Deceiver(ServiceService, {
    postServiceWithEmployeesRoute: jasmine.createSpy('postServiceWithEmployeesRoute'),
  });
  const translateService: TranslateService = Deceiver(TranslateService, { get: jasmine.createSpy('get') });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        GenerateWidgetDataService,
        provideMockFactoryLogger(),
        { provide: WidgetService, useValue: widgetService },
        { provide: ServiceService, useValue: serviceService },
        { provide: TranslateService, useValue: translateService },
      ],
    });

    service = TestBed.get(GenerateWidgetDataService);
    (widgetService.getWidgetRoute as jasmine.Spy).calls.reset();
    (serviceService.postServiceWithEmployeesRoute as jasmine.Spy).calls.reset();
  });

  describe('resolve', () => {
    it('should return correct values', () => {
      const wId = 'abc123';
      const getWidget = { serviceId: '1234', expertId: 'exper1234', id: 'abc123' };
      const serviceDetails: ReadonlyArray<any> = [
        {
          serviceDetails: {
            id: '1234',
            name: 'name',
            description: 'description',
            grossPrice: { amount: 124, currency: 'PLN' },
          },
          employeesDetails: [{ employeeProfile: { id: 'exper1234', name: 'Macko', avatar: 'asdf' } }],
        },
      ];
      const result = {
        serviceName: 'name',
        serviceDesc: 'description',
        servicePrice: '1,24',
        expertName: 'Macko',
        expertAvatar: 'asdf',
      };
      (widgetService.getWidgetRoute as jasmine.Spy).and.returnValue(cold('-a|', { a: getWidget }));
      (serviceService.postServiceWithEmployeesRoute as jasmine.Spy).and.returnValue(cold('-a|', { a: serviceDetails }));
      expect(service.resolve(wId)).toBeObservable(cold('--a|', { a: result }));
    });
    it('should return first expert from the list if organization generates widget', () => {
      const wId = 'abc123';
      const getWidget = { serviceId: '1234', expertId: undefined, id: 'abc123' };
      const serviceDetails: ReadonlyArray<any> = [
        {
          serviceDetails: {
            id: '1234',
            name: 'name',
            description: 'description',
            grossPrice: { amount: 124, currency: 'PLN' },
          },
          employeesDetails: [{ employeeProfile: { id: 'exper1234', name: 'Macko', avatar: 'asdf' } }],
        },
      ];
      const result = {
        serviceName: 'name',
        serviceDesc: 'description',
        servicePrice: '1,24',
        expertName: 'Macko',
        expertAvatar: 'asdf',
      };
      (widgetService.getWidgetRoute as jasmine.Spy).and.returnValue(cold('-a|', { a: getWidget }));
      (serviceService.postServiceWithEmployeesRoute as jasmine.Spy).and.returnValue(cold('-a|', { a: serviceDetails }));
      expect(service.resolve(wId)).toBeObservable(cold('--a|', { a: result }));
    });
    it('should complete but not return value when no service id provided', () => {
      const wId = 'abc123';
      const getWidget = { expertId: 'exper1234', id: 'abc123' };
      (widgetService.getWidgetRoute as jasmine.Spy).and.returnValue(cold('-a|', { a: getWidget }));
      expect(service.resolve(wId)).toBeObservable(cold('--|', {}));
    });
    it('should return undefined when no matching service found', () => {
      const wId = 'abc123';
      const getWidget = { serviceId: '1234', expertId: 'exper1234', id: 'abc123' };
      const serviceDetails: ReadonlyArray<any> = [
        {
          serviceDetails: {
            id: '',
            name: 'name',
            description: 'description',
            grossPrice: { amount: 124, currency: 'PLN' },
          },
          employeesDetails: [{ employeeProfile: { id: 'exper1234', name: 'Macko', avatar: 'asdf' } }],
        },
      ];
      const result = undefined;
      (widgetService.getWidgetRoute as jasmine.Spy).and.returnValue(cold('-a|', { a: getWidget }));
      (serviceService.postServiceWithEmployeesRoute as jasmine.Spy).and.returnValue(cold('-a|', { a: serviceDetails }));
      expect(service.resolve(wId)).toBeObservable(cold('---|', { a: result }));
    });
    it('should call returned some data when no expert is assigned to consultation', () => {
      const wId = 'abc123';
      const getWidget = { serviceId: '1234', expertId: undefined, id: 'abc123' };
      const serviceDetails: ReadonlyArray<any> = [
        {
          serviceDetails: {
            id: '1234',
            name: 'name',
            description: 'description',
            grossPrice: { amount: 124, currency: 'PLN' },
          },
          employeesDetails: [],
        },
      ];
      const result = {
        serviceName: 'name',
        serviceDesc: 'description',
        servicePrice: '1,24',
        expertName: 'Konsultant',
        expertAvatar: undefined,
      };
      (widgetService.getWidgetRoute as jasmine.Spy).and.returnValue(cold('-a|', { a: getWidget }));
      (serviceService.postServiceWithEmployeesRoute as jasmine.Spy).and.returnValue(cold('-a|', { a: serviceDetails }));
      (translateService.get as jasmine.Spy).and.returnValue(cold('-a|', { a: 'Konsultant' }));
      expect(service.resolve(wId)).toBeObservable(cold('---a|', { a: result }));
    });
  });
});
