import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService;
import IScope = angular.IScope;
import expertActivityModule, {IExpertActivityComponentBindings} from './activity'
import {ModalsService} from '../../../../../services/modals/modals.service'
import {ExpertActivityComponentController} from './activity.controller'
import {GetActivity} from 'profitelo-api-ng/model/models';

describe('Unit testing: profitelo.components.dashboard.expert.activities.activity', () => {
  return describe('for exertLastActivitiesList >', () => {

    let scope: IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: ExpertActivityComponentController
    const validHTML = '<expert-activity activity="{}"></expert-activity>'
    let $log: ng.ILogService

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      angular.mock.module(expertActivityModule)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$log_: ng.ILogService,
              $componentController: ng.IComponentControllerService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        $log = _$log_

        component = $componentController<ExpertActivityComponentController, IExpertActivityComponentBindings>(
          'expertActivity', {}, {})
      })

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should open createExpertSUEActivityDetailsModal', inject((modalsService: ModalsService) => {
      component.isCallActivity = true
      component.activity = {
        accountId: 'accountId',
        activityType: GetActivity.ActivityTypeEnum.CLIENTSERVICEUSAGEEVENT,
        serviceUsageDetails: {
          expertAvatar: 'expertAvatar',
          expertName: 'expertName',
          serviceUsageEventId: 'serviceUsageEventId',
          createdAt: new Date()
        },
        financialOperation: {
          id: 'id',
          operation: {
            amount: 123,
            currency: 'PLN'
          },
          type: 'type'
        },
          accountType: GetActivity.AccountTypeEnum.CLIENT,
          createdAt: new Date()
      }
      spyOn(modalsService, 'createExpertSUEActivityDetailsModal')
      component.openActivityDescription()
      expect(modalsService.createExpertSUEActivityDetailsModal).toHaveBeenCalled()
    }))

    it('should open createClientChargeDetailsModal', inject((modalsService: ModalsService) => {
      spyOn(modalsService, 'createClientChargeDetailsModal')
      component.openActivityDescription()
      expect(modalsService.createClientChargeDetailsModal).toHaveBeenCalled()
    }))

    it('should log error when SUE is undefined', () => {
      component.isCallActivity = true
      component.activity = {
        accountId: 'accountId',
        activityType: GetActivity.ActivityTypeEnum.CLIENTSERVICEUSAGEEVENT,
        serviceUsageDetails: {
          expertAvatar: 'expertAvatar',
          expertName: 'expertName',
          serviceUsageEventId: '',
          createdAt: new Date()
        },
        financialOperation: {
          id: 'id',
          operation: {
            amount: 123,
            currency: 'PLN'
          },
          type: 'type'
        },
        accountType: GetActivity.AccountTypeEnum.CLIENT,
        createdAt: new Date()
      }
      spyOn($log, 'error')
      component.openActivityDescription()
      expect($log.error).toHaveBeenCalledWith('Activity SUE is undefined')
    })

  })
})
