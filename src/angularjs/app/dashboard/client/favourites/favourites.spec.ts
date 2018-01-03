import * as angular from 'angular'
import {IRootScopeService} from '../../../../common/services/root-scope/root-scope.service';


describe('Unit tests: DashboardClientFavouritesController >', () => {
  describe('Testing Controller: DashboardClientFavouritesController', () => {

    let $scope: any
    let DashboardClientFavouritesController: any
    let $state: ng.ui.IStateService

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
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $q: ng.IQService) => {
        $scope = $rootScope.$new()

        $state = <ng.ui.IStateService>{
          go: (_to: string): ng.IPromise<{}> => $q.resolve({})
        }

        DashboardClientFavouritesController = $controller('DashboardClientFavouritesController', {
          clientFavouritesConsultations: clientFavouritesConsultations,
          $state: $state
        })
      })
    })

    it('should exists', () => {
      expect(!!DashboardClientFavouritesController).toBe(true)
    })

    it('should redirect to app.search-result', () => {
      spyOn($state, 'go')
      DashboardClientFavouritesController.searchForExpert()
      expect($state.go).toHaveBeenCalledWith('app.search-result')
    })

  })
})
