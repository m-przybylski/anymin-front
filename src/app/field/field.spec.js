describe('Unit tests: Field section >', () => {
  describe('Testing Controller: FieldController', () => {

    var $scope
    var FieldController

    beforeEach(() => {
      module('profitelo.controller.field')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        FieldController = $controller('FieldController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state
        })
      })
    })


    it('should exists', () => {
      return expect(!!FieldController).toBe(true)
    })

  })
})
