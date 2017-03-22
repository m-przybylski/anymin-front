import * as angular from 'angular'
import {ProfileApi} from 'profitelo-api-ng/api/api'
import './expert-profile'
import expertProfilePageModule from './expert-profile'
import recommendedServicesModule from '../../common/services/recommended-services/recommended-services'

describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    let ExpertProfileController: any
    let _scope: any

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeURL/')
    }))

    beforeEach(() => {
      angular.mock.module(expertProfilePageModule)
      angular.mock.module(recommendedServicesModule)

      inject(( $controller: ng.IControllerService, $timeout: ng.ITimeoutService,
               $stateParams: ng.ui.IStateParamsService, ProfileApi: ProfileApi) => {

        ExpertProfileController = $controller('ExpertProfileController', {
          $scope: _scope,
          $stateParams: $stateParams,
          $$timeout: $timeout,
          expertOrganizations: [],
          expertProfile: {type: '', profile: {expertDetails: {}}},
          ProfileApi: ProfileApi,
        })
      })
    })

    it('should exists', () => {
      expect(!!ExpertProfileController).toBe(true)
    })

  })
})
