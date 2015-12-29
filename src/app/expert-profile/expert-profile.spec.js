describe('Unit tests: expert-profile >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    var $scope = null
    var ExpertProfileController = null
    var AccountsRestServiceResolver = {}
    var SessionsRestServiceResolver = {}

    beforeEach(() => {
      module('profitelo.controller.expert-profile')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        ExpertProfileController = $controller('ExpertProfileController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state,
          AccountsRestServiceResolver: AccountsRestServiceResolver,
          SessionsRestServiceResolver: SessionsRestServiceResolver
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

      it('SessionsRestServiceResolver should exsist', () => {
        return expect(!!SessionsRestServiceResolver).toBe(true)
      })
    })

  })
})
