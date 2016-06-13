describe('Unit tests: ServiceProviderStepController >', () => {
  describe('Testing Controller: ServiceProviderStepController', () => {

    let ServiceProviderStepController
    let ServiceProviderStepControllerSlave
    let _scope
    let _scopeSlave
    let url = 'awesomeUrl/'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.consultation-range')
      inject(($rootScope, $controller, _ProfileApi_) => {

        _scope = $rootScope.$new()
        _scope.queue = {
          skippedSteps: []
        }


        ServiceProviderStepController = $controller('ServiceProviderStepController', {
          $scope: _scope,
          ProfileApi: _ProfileApi_,
          savedProfile: {}
        })

        _scopeSlave = $rootScope.$new()
        _scopeSlave.queue = {
          skippedSteps: []
        }

        ServiceProviderStepControllerSlave = $controller('ServiceProviderStepController', {
          $scope: _scopeSlave,
          ProfileApi: _ProfileApi_,
          savedProfile: {}
        })

      })
    })

    it('should exists', () => {
      return expect(!!ServiceProviderStepController).toBe(true)
    })

    it('should start order change on onClick function', () => {


      _scope.queue.currentStep = 3
      _scope.order = 3

      _scopeSlave.order = 4

      _scope.onClick(4)
    })

    it('should save step', () => {

      _scope.saveSection = () => {}

      _scope.saveStep()
    })

    it('should skip step', () => {
      _scope.skip()
    })

    it('should proceed', () => {
      _scope.proceed()
    })

  })
})