describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    var $scope
    var ExpertProfileController

    beforeEach(() => {
      module('profitelo.controller.expert-profile')
      console.log('sd')
      inject(($rootScope, $controller, _$state_) => {
        $scope = $rootScope.$new()
        ExpertProfileController = $controller('ExpertProfileController', {
          $state: _$state_
        })
      })
    })

    // it('should exists', () => {
    //   expect(!!ExpertProfileController).toBe(true)
    // })

  })
})
