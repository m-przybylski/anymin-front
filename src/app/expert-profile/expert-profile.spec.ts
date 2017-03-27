import * as angular from 'angular'
import {ProfileApi} from 'profitelo-api-ng/api/api'
import './expert-profile'
import expertProfilePageModule from './expert-profile'
import {ProfileApiMock} from 'profitelo-api-ng/api/api'
import {IExpertProfileStateParams} from './expert-profile'
import {ProfileTypes} from '../../common/components/profile/profile-header/profile-header'
import IScope = angular.IScope

describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    let ExpertProfileController: any
    let scope: IScope
    let httpBackend: ng.IHttpBackendService
    let ProfileApiMock: ProfileApiMock
    let stateParams: IExpertProfileStateParams
    let log: ng.ILogService
    
    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeURL/')
    }))

    beforeEach(() => {
      angular.mock.module(expertProfilePageModule)

      inject(( $controller: ng.IControllerService, $timeout: ng.ITimeoutService,
               $stateParams: IExpertProfileStateParams, ProfileApi: ProfileApi,
               $httpBackend: ng.IHttpBackendService, _ProfileApiMock_: ProfileApiMock,
               $log: ng.ILogService) => {

        httpBackend = $httpBackend
        ProfileApiMock = _ProfileApiMock_
        stateParams = $stateParams
        log = $log
        stateParams.profileId = ':profileId'
        ExpertProfileController = $controller('ExpertProfileController', {
          $scope: scope,
          $stateParams: stateParams,
          $$timeout: $timeout,
          expertOrganizations: [],
          expertProfile: {isFavourite: false, profile: {expertDetails: {}}},
          ProfileApi: ProfileApi,
          $log: log,
          ProfileTypes:  ProfileTypes
        })
      })
    })

    it('should exists', () => {
      expect(!!ExpertProfileController).toBe(true)
    })

    it('should like the profile', () => {

      ProfileApiMock.postProfileFavouriteExpertRoute(200, ':profileId', {profileId: ':profileId'})
      ExpertProfileController.handleLike()
      httpBackend.flush()
      expect(ExpertProfileController.isFavourite).toBe(true)
    })

    it('should dislike the profile', () => {
      ExpertProfileController.isFavourite = true
      ProfileApiMock.deleteProfileFavouriteExpertRoute(200, ':profileId', {profileId: ':profileId'})
      ExpertProfileController.handleLike()
      httpBackend.flush()
      expect(ExpertProfileController.isFavourite).toBe(false)
    })

    it('should call the log error on like', () => {
      spyOn(log, 'error')
      ProfileApiMock.postProfileFavouriteExpertRoute(500, ':profileId', {profileId: ':profileId'})
      ExpertProfileController.handleLike()
      httpBackend.flush()
      expect(log.error).toHaveBeenCalled()
    })

    it('should call the log error on dislike', () => {
      spyOn(log, 'error')
      ExpertProfileController.isFavourite = true
      ProfileApiMock.deleteProfileFavouriteExpertRoute(500, ':profileId', {profileId: ':profileId'})
      ExpertProfileController.handleLike()
      httpBackend.flush()
      expect(log.error).toHaveBeenCalled()
    })

  })
})
