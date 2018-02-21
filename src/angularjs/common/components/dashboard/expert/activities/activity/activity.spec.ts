import * as angular from 'angular';
import expertActivityModule, {IExpertActivityComponentBindings} from './activity'
import {ModalsService} from '../../../../../services/modals/modals.service'
import {ExpertActivityComponentController} from './activity.controller'
import {GetProfileActivity} from 'profitelo-api-ng/model/models';

describe('Unit testing: profitelo.components.dashboard.expert.activities.activity', () => {
  return describe('for exertLastActivitiesList >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: ExpertActivityComponentController

    let $log: ng.ILogService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      angular.mock.module(expertActivityModule)

      inject(($rootScope: any, $compile: ng.ICompileService, _$log_: ng.ILogService,
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

    it('should open createExpertSUEActivityDetailsModal', inject((modalsService: ModalsService) => {
      component.isCallActivity = true
      component.activity = {
        accountId: 'accountId',
        activityType: GetProfileActivity.ActivityTypeEnum.SERVICEUSAGEEVENT,
        serviceUsageDetails: {
          expertAvatar: 'expertAvatar',
          expertName: 'expertName',
          serviceUsageEventId: 'serviceUsageEventId',
        },
        financialOperation: {
          id: 'id',
          operation: {
            amount: 123,
            currency: 'PLN'
          },
          type: 'type'
        },
          initializedAt: new Date()
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
        activityType: GetProfileActivity.ActivityTypeEnum.SERVICEUSAGEEVENT,
        serviceUsageDetails: {
          expertAvatar: 'expertAvatar',
          expertName: 'expertName',
          serviceUsageEventId: '',
        },
        financialOperation: {
          id: 'id',
          operation: {
            amount: 123,
            currency: 'PLN'
          },
          type: 'type'
        },
        initializedAt: new Date()
      }
      spyOn($log, 'error')
      component.openActivityDescription()
      expect($log.error).toHaveBeenCalledWith('Activity SUE is undefined')
    })

  })
})
