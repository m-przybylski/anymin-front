describe('Unit tests: Field section >', () => {
  describe('Testing Controller: FieldController', () => {

    var $scope
    var ConsultationsFieldController

    beforeEach(() => {
      module('profitelo.controller.consultations-field')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        FieldController = $controller('ConsultationsFieldController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state
        })
      })
    })


    it('should exists', () => {
      return expect(!!ConsultationsFieldController).toBe(true)
    })

  })
})
