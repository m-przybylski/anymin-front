describe('Unit tests: Service Wizard Section >', () => {
  describe('Testing Controller Method: CreateNewServiceController', () => {

    var $scope
    var CreateNewServiceController

    beforeEach(() => {
      module('profitelo.controller.wizards.create-new-service')
      inject(($rootScope, $controller) => {
        $scope = $rootScope.$new()
        CreateNewServiceController = createNewServiceController
      })
    })

    it('should exists', function() {
      return expect(!!CreateNewServiceController).toBe(true)
    })

  })
})
