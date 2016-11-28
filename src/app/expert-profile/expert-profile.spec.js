describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    let ExpertProfileController
    let _scope

    beforeEach(() => {
      module('profitelo.controller.expert-profile')
      inject(($rootScope, $controller, $timeout, $stateParams, _smoothScrolling_) => {

        _scope = $rootScope.$new()

        ExpertProfileController = $controller('ExpertProfileController', {
          $scope: _scope,
          $stateParams: $stateParams,
          $timeout: $timeout,
          smoothScrolling: _smoothScrolling_,
          expertOrganizations: [],
          similarExperts: [],
          expertProfile: {type: '', expertDetails: {}}
        })
      })
    })

    it('should exists', () => {
      expect(!!ExpertProfileController).toBe(true)
    })
  })
})
