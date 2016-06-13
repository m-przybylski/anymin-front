describe('Unit tests: ServiceProviderStepController >', () => {
  describe('Testing Controller: ServiceProviderStepController', () => {

    let ServiceProviderStepController
    let ServiceProviderStepControllerSlave
    let _scope
    let _scopeSlave
    let _timeout
    let _smoothScrolling
    let url = 'awesomeUrl/'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.consultation-range')
      inject(($rootScope, $controller, _ProfileApi_, _$timeout_) => {

        _timeout = _$timeout_

        _smoothScrolling = {
          scrollTo: () => {}
        }

        let _queue = {
          skippedSteps: []
        }

        _scope = $rootScope.$new()
        _scope.queue = _queue


        ServiceProviderStepController = $controller('ServiceProviderStepController', {
          $scope: _scope,
          smoothScrolling: _smoothScrolling

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

      spyOn(_scope, 'saveShadowModel')
      _scope.onClick(4)

      expect(_scope.queue.currentStep).toEqual(4)
      expect(_scope.saveShadowModel).toHaveBeenCalled()

    })

    it('should save step', () => {

      _scope.saveSection = () => {}
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

      spyOn(_smoothScrolling, 'scrollTo')

      _scope.proceed()
      _timeout.flush()

      expect(_smoothScrolling.scrollTo).toHaveBeenCalledWith(5)

    })

  })
})