describe('Unit tests: Field section >', () => {
  describe('Testing Controller: ConsultationsFieldController', () => {

    var $scope
    var ConsultationsFieldController

    beforeEach(() => {
      module('profitelo.controller.consultations-field')
      inject(($rootScope, $controller) => {
        $scope = $rootScope.$new()
        ConsultationsFieldController = $controller('ConsultationsFieldController', {
          $scope: $scope,
          $rootScope: $rootScope
        })
      })
    })


    it('should exists', () => {
      return expect(!!ConsultationsFieldController).toBe(true)
    })

  })
})
