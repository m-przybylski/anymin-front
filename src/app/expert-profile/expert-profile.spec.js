describe('Unit tests: expert-profile >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    var $scope = null
    var ExpertProfileController = null
    var AccountsRestServiceResolver = {}

    beforeEach(() => {
      module('profitelo.controller.expert-profile')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        ExpertProfileController = $controller('ExpertProfileController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state,
          AccountsRestServiceResolver: AccountsRestServiceResolver
        })
      })
    })

    it('should exsist', () => {
      return expect(!!ExpertProfileController).toBe(true)
    })

    describe('controller resolve services', () => {
      it('AccountsRestServiceResolver should exsist', () => {
        return expect(!!AccountsRestServiceResolver).toBe(true)
      })
    })

  })
})
