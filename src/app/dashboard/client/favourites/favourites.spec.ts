import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService

describe('Unit tests: DashboardClientFavouritesController >', () => {
  describe('Testing Controller: DashboardClientFavouritesController', () => {

    let $scope: any
    let DashboardClientFavouritesController: any

    const clientFavouritesConsultations = {
      balance: {},
      lastConsultations: {},
      favouriteProfiles: {}
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.client.favourites')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {
        $scope = $rootScope.$new()

        DashboardClientFavouritesController = $controller('DashboardClientFavouritesController', {
          clientFavouritesConsultations: clientFavouritesConsultations
        })
      })
    })

    it('should exists', () => {
      expect(!!DashboardClientFavouritesController).toBe(true)
    })

  })
})
