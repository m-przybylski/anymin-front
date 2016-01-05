describe('Unit tests: Service Wizard Section >', () => {
  describe('Testing Controller: ServiceWizardController', () => {

    var $scope
    var ServiceWizardController

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-wizard')
      inject(($rootScope, $controller) => {
        $scope = $rootScope.$new()
        ServiceWizardController = $controller('ServiceWizardController', {
        })
      })
    })


    it('should exists', () => {
      return expect(!!ServiceWizardController).toBe(true)
    })

  })
})
