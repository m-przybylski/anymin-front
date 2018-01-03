import * as angular from 'angular'

import {ModalsService} from '../../../../../../services/modals/modals.service'
import modalsModule from '../../../../../../services/modals/modals'
describe('Unit testing: profitelo.components.dashboard.client.activities.client-activity', () => {
  return describe('for clientLastActivitiesList >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let $log: ng.ILogService
    const validHTML = '<client-activity data-activity="activity"></client-activity>'
    const mockObject = {
      sueProfileServiceTuple: {
        profile: {
          expertDetails: {}
        }
      }
    }
    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      scope.activity = mockObject
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    const bindings: any = {
      activity: mockObject
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {

    angular.mock.module('profitelo.services.url')
    angular.mock.module(modalsModule)
    angular.mock.module('profitelo.filters.money')
    angular.mock.module('profitelo.components.complaints.status')
    angular.mock.module('profitelo.components.dashboard.client.activities.client-activity')

      inject(($rootScope: any, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _modalsService_: ModalsService,
              _$log_: ng.ILogService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        $log = _$log_

        const injectors = {
          modalsService: _modalsService_
        }

        component = componentController('clientActivity', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should log error when SUE is undefined', () => {
      spyOn($log, 'error')
      component.isCallActivity = true
      component.activity = {
        serviceUsageDetails: {
          expertAvatar: 'avatar',
          expertName: 'name',
          serviceUsageEventId: '',
          createdAt: Date
        }
      }
      component.openActivityDescription()
      expect($log.error).toHaveBeenCalledWith('Activity SUE is undefined')
    })

    it('should open createClientSUEActivityDetailsModal', inject((modalsService: ModalsService) => {
      spyOn(modalsService, 'createClientSUEActivityDetailsModal')
      component.isCallActivity = true
      component.activity = {
        serviceUsageDetails: {
          expertAvatar: 'avatar',
          expertName: 'name',
          serviceUsageEventId: 'sueId',
          createdAt: Date
        }
      }
      component.openActivityDescription()
      expect(modalsService.createClientSUEActivityDetailsModal).toHaveBeenCalledWith('sueId')
    }))

    it('should open createClientChargeDetailsModal', inject((modalsService: ModalsService) => {
      spyOn(modalsService, 'createClientChargeDetailsModal')
      component.isCallActivity = false
      component.openActivityDescription()
      expect(modalsService.createClientChargeDetailsModal).toHaveBeenCalledWith(component.activity)
    }))

  })
})
