describe('Unit tests: DashboardClientFavouritesController >', () => {
  describe('Testing Controller: DashboardClientFavouritesController', () => {

    let $scope
    let DashboardClientFavouritesController

    const clientFavouritesConsultations = {
      balance: {},
      lastConsultations: {},
      favouriteProfiles: {}
    }

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.services.recommended-profiles-service')
    angular.mock.module('profitelo.controller.dashboard.client.favourites')
      inject(($rootScope, $controller, _recommendedProfilesServices_) => {
        $scope = $rootScope.$new()

        DashboardClientFavouritesController = $controller('DashboardClientFavouritesController', {
          clientFavouritesConsultations: clientFavouritesConsultations,
          recommendedProfilesServices: _recommendedProfilesServices_
        })
      })
    })

    it('should exists', () => {
      expect(!!DashboardClientFavouritesController).toBe(true)
    })

  })
})
