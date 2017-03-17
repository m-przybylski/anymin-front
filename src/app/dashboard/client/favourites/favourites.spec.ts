import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {RecommendedServicesService} from '../../../../common/services/recommended-services/recommended-services.service'

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
      angular.mock.module('profitelo.services.recommended-services')
      angular.mock.module('profitelo.controller.dashboard.client.favourites')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
              _recommendedServices_: RecommendedServicesService) => {
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
