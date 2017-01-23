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
    angular.mock.module('profitelo.services.recommended-services')
    angular.mock.module('profitelo.controller.dashboard.client.favourites')
      inject(($rootScope, $controller, _recommendedServices_) => {
        $scope = $rootScope.$new()

        DashboardClientFavouritesController = $controller('DashboardClientFavouritesController', {
          clientFavouritesConsultations: clientFavouritesConsultations,
          recommendedServices: _recommendedServices_
        })
      })
    })

    it('should exists', () => {
      expect(!!DashboardClientFavouritesController).toBe(true)
    })

  })
})
