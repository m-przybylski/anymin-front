import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ProfileApi} from 'profitelo-api-ng/api/api'
import {SmoothScrollingService} from '../../../services/smooth-scrolling/smooth-scrolling.service'

describe('Unit tests: ServiceProviderStepController >', () => {
  describe('Testing Controller: ServiceProviderStepController', () => {

    let ServiceProviderStepController: any
    let ServiceProviderStepControllerSlave
    let _scope: any
    let _scopeSlave: any
    let _timeout: ng.ITimeoutService
    let _smoothScrollingService: SmoothScrollingService
    let url = 'awesomeUrl/'

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.service-provider.consultation-range')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _ProfileApi_: ProfileApi,
              _$timeout_: ng.ITimeoutService) => {

        _timeout = _$timeout_

        _smoothScrollingService = <any>{
          scrollTo: () => {
          },
          simpleScrollTo: () => {
          }
        }

        let _queue = {
          skippedSteps: []
        }

        _scope = $rootScope.$new()
        _scope.queue = _queue


        ServiceProviderStepController = $controller('ServiceProviderStepController', {
          $scope: _scope,
          smoothScrollingService: _smoothScrollingService

        })

        _scopeSlave = $rootScope.$new()
        _scopeSlave.queue = _queue

        ServiceProviderStepControllerSlave = $controller('ServiceProviderStepController', {
          $scope: _scopeSlave
        })

      })
    })

    it('should exists', () => {
      return expect(!!ServiceProviderStepController).toBe(true)
    })

    it('should change current step on onClick function', () => {


      _scope.queue.currentStep = 3
      _scope.order = 3

      _scopeSlave.order = 4

      spyOn(_scopeSlave, 'saveShadowModel')
      _scope.onClick(4)

      expect(_scope.queue.currentStep).toEqual(4)
      expect(_scopeSlave.saveShadowModel).toHaveBeenCalled()

    })

    it('should save step', () => {

      _scope.saveSection = () => {
      }
      spyOn(_scope, 'saveSection')
      _scope.saveStep()
      expect(_scope.saveSection).toHaveBeenCalled()

    })

    it('should skip step', () => {

      _scope.order = 5
      _scope.queue.completedSteps = 4

      _scope.skip()

      expect(_scope.queue.currentStep).toEqual(6)
    })

    it('should restore shadowModel when skipped', () => {
      _scope.model = {
        test: true
      }

      spyOn(_scope, 'restoreShadowModel').and.callThrough()

      _scope.saveShadowModel()

      _scope.skip()

      expect(_scope.restoreShadowModel).toHaveBeenCalled()

    })

    it('should proceed', () => {

      _scope.order = 4
      _scope.queue.completedSteps = 5

      _scope.proceed()

      expect(_scope.queue.currentStep).toEqual(5)

    })

    it('should scroll if going down the wizard', () => {

      _scope.order = 4
      _scope.queue.currentStep = 3
      _scope.queue.amountOfSteps = 40

      spyOn(_smoothScrollingService, 'scrollTo')

      _scope.proceed()
      _timeout.flush()

      expect(_smoothScrollingService.scrollTo).toHaveBeenCalledWith(5)

    })

  })
})
