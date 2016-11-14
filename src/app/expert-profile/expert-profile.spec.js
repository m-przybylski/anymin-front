describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    let ExpertProfileController
    let _scope

    let url = 'awesomeUrl/'

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
          savedProfile: {type: '', expertDetails: {}},
        })


      })
    })

    it('should exists', () => {
      expect(!!ExpertProfileController).toBe(true)
    })
  })
})
