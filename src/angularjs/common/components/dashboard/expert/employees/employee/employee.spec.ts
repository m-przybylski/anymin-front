import * as angular from 'angular'

import expertEmployeeModule from './employee';
import {ExpertEmployeeComponentController, IExpertEmployeeComponentControllerScope} from './employee.controller';
import {ErrorHandlerService} from '../../../../../services/error-handler/error-handler.service'
import {EmploymentApiMock} from 'profitelo-api-ng/api/api';
import {TopAlertService} from '../../../../../services/top-alert/top-alert.service'
import { ModalsService } from '../../../../../services/modals/modals.service';

describe('Unit testing: profitelo.components.dashboard.expert.employees.employee', () =>
  describe('for expertEmployee >', () => {

    let scope: IExpertEmployeeComponentControllerScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: ExpertEmployeeComponentController
    let topAlertService: TopAlertService
    let EmploymentApiMock: EmploymentApiMock
    let modalsService: ModalsService
    const errorHandler: ErrorHandlerService = <ErrorHandlerService>{
      handleServerError: (_err: any, _logMessage: string): void => {}
    }
    let httpBackend: ng.IHttpBackendService

    const validHTML = '<expert-employee data-profile-with-employments="profileWithEmployments"></expert-employee>'

    const profileWithEmployments = {
      expertProfile: {
        id: 'id',
        name: 'name',
        img: 'img'
      },
      employments: [{
        id: 'id',
        serviceId: 'serviceId',
        profileId: 'profileId',
        createdAt: new Date()
      }]
    }

    function create(html: string): JQuery {
      scope = <IExpertEmployeeComponentControllerScope>rootScope.$new()
      scope.profileWithEmployments = profileWithEmployments
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('topAlertService', {})
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
    }))

    beforeEach(() => {

      angular.mock.module(expertEmployeeModule)

      inject(($rootScope: any,
              $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService,
              _$httpBackend_: ng.IHttpBackendService,
              _topAlertService_: TopAlertService,
              _EmploymentApiMock_: EmploymentApiMock,
              _modalsService_: ModalsService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        httpBackend = _$httpBackend_
        topAlertService = _topAlertService_
        EmploymentApiMock = _EmploymentApiMock_
        modalsService = _modalsService_
      })

      component = componentController<ExpertEmployeeComponentController, {}>('expertEmployee',
        {errorHandler}, {profileWithEmployments})

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should show error when delete employee failed', () => {
      spyOn(errorHandler, 'handleServerError')
      spyOn(modalsService, 'createConfirmAlertModal').and.callFake((_msg: string, cb: () => void) => {
        cb();
      });
      EmploymentApiMock.deleteEmploymentsRoute(500)
      component.deleteEmployee()
      httpBackend.flush()
      expect(errorHandler.handleServerError).toHaveBeenCalled()
    })

    it('should delete employee', () => {
      spyOn(topAlertService, 'success')
      spyOn(modalsService, 'createConfirmAlertModal').and.callFake((_msg: string, cb: () => void) => {
        cb();
      });
      EmploymentApiMock.deleteEmploymentsRoute(200, {employmentIds: ['id']})
      component.deleteEmployee()
      httpBackend.flush()
      expect(topAlertService.success).toHaveBeenCalled()
    })

  })
)
