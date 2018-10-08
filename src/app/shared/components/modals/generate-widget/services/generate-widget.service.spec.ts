import { TestBed } from '@angular/core/testing';
import { provideMockFactoryLogger } from 'testing/testing';
import { GenerateWidgetService } from './generate-widget.service';
import { NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService, WidgetService } from '@anymind-ng/api';
import { CommonSettingsService } from 'angularjs/common/services/common-settings/common-settings.service';
import { Deceiver } from 'deceiver-core';
import { cold } from 'jasmine-marbles';

describe('GenerateWidgetService', () => {
  let service: GenerateWidgetService;
  let modalService: NgbModal;

  const widgetService: WidgetService = Deceiver(WidgetService, { getWidgetRoute: jasmine.createSpy('getWidgetRoute') });
  const serviceService: ServiceService = Deceiver(ServiceService, {
    postServiceWithEmployeesRoute: jasmine.createSpy('postServiceWithEmployeesRoute'),
  });
  const commonSettingsService: CommonSettingsService = new CommonSettingsService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModalModule.forRoot()],
      providers: [
        GenerateWidgetService,
        provideMockFactoryLogger(),
        {
          provide: CommonSettingsService,
          useValue: commonSettingsService,
        },
        { provide: WidgetService, useValue: widgetService },
        { provide: ServiceService, useValue: serviceService },
      ],
    });

    service = TestBed.get(GenerateWidgetService);
    modalService = TestBed.get(NgbModal);
    (widgetService.getWidgetRoute as jasmine.Spy).calls.reset();
    (serviceService.postServiceWithEmployeesRoute as jasmine.Spy).calls.reset();
  });

  describe('openModal', () => {
    it('should call open modal', () => {
      const spy = spyOn(modalService, 'open');
      service.openModal({ serviceId: 'asd', expertId: 'aaa', widgetId: 'qqq' });
      expect(spy).toHaveBeenCalled();
    });
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
    it('should never complete but not return value when no service id provided', () => {
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
      expect(service.resolve(wId)).toBeObservable(cold('--a|', { a: result }));
    });
  });
});
