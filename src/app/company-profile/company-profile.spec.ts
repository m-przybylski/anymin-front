import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ProfileApiMock, ProfileApi} from 'profitelo-api-ng/api/api'
import './company-profile'
import {ICompanyProfileStateParams, default as companyProfilePageModule} from './company-profile'
import {ProfileTypes} from '../../common/components/profile/profile-header/profile-header'
import IScope = angular.IScope


describe('Unit tests: CompanyProfileController >', () => {
  describe('Testing Controller: CompanyProfileController', () => {

    let CompanyProfileController: any
    let scope: IScope
    let httpBackend: ng.IHttpBackendService
    let ProfileApiMock: ProfileApiMock
    let stateParams: ICompanyProfileStateParams
    let log: ng.ILogService

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module(companyProfilePageModule)

      inject(($rootScope: IRootScopeService, $stateParams: ICompanyProfileStateParams,
              $controller: ng.IControllerService, ProfileApi: ProfileApi,
              $httpBackend: ng.IHttpBackendService, _ProfileApiMock_: ProfileApiMock,
              $log: ng.ILogService) => {

        scope = $rootScope.$new()
        httpBackend = $httpBackend
        ProfileApiMock = _ProfileApiMock_
        stateParams = $stateParams
        log = $log
        stateParams.profileId = ':profileId'
        CompanyProfileController = $controller('CompanyProfileController', {
          $scope: scope,
          $stateParams: stateParams,
          expertOrganizations: [],
          companyProfile: {isFavourite: false, profile: {companyDetails: {}}},
          ProfileApi: ProfileApi,
          $log: log,
          ProfileTypes:  ProfileTypes
        })
      })
    })

    it('should exists', () => {
      expect(!!CompanyProfileController).toBe(true)
    })

    it('should like the profile', () => {

      ProfileApiMock.postProfileFavouriteOrganizationRoute(200, ':profileId', {profileId: ':profileId'})
      CompanyProfileController.handleLike()
      httpBackend.flush()
      expect(CompanyProfileController.isFavourite).toBe(true)
    })

    it('should dislike the profile', () => {
      CompanyProfileController.isFavourite = true
      ProfileApiMock.deleteProfileFavouriteOrganizationRoute(200, ':profileId', {profileId: ':profileId'})
      CompanyProfileController.handleLike()
      httpBackend.flush()
      expect(CompanyProfileController.isFavourite).toBe(false)
    })

    it('should call the log error on like', () => {
      spyOn(log, 'error')
      ProfileApiMock.postProfileFavouriteOrganizationRoute(500, ':profileId', {profileId: ':profileId'})
      CompanyProfileController.handleLike()
      httpBackend.flush()
      expect(log.error).toHaveBeenCalled()
    })

    it('should call the log error on dislike', () => {
      spyOn(log, 'error')
      CompanyProfileController.isFavourite = true
      ProfileApiMock.deleteProfileFavouriteOrganizationRoute(500, ':profileId', {profileId: ':profileId'})
      CompanyProfileController.handleLike()
      httpBackend.flush()
      expect(log.error).toHaveBeenCalled()
    })
  })
})
