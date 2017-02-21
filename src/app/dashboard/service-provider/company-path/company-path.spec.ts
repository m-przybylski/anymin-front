namespace profitelo.dashboard.serviceProvider.companyPath {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import Profile = profitelo.models.Profile
  import IProfileApi = profitelo.api.IProfileApi

  describe('Unit tests: CompanyPathController >', () => {
    describe('Testing Controller: CompanyPathController', () => {

      let CompanyPathController: any
      let _scope: any
      let _httpBackend: ng.IHttpBackendService
      let _ProfileApi: IProfileApi
      let _ProfileApiDef: any
      let User: any
      let resourcesExpectations: any
      let _controller: any
      let _state: ng.ui.IStateService
      let _topAlertService: ITopAlertService
      let _timeout: ng.ITimeoutService
      let _smoothScrollingService: ISmoothScrollingService

      let url = 'awesomeUrl/'

      let createController = (profile: Profile | null) => {
        return _controller('CompanyPathController', {
          $scope: _scope,
          ProfileApi: _ProfileApi,
          User: User,
          savedProfile: profile,
          smoothScrollingService: _smoothScrollingService
        })
      }


      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', url)
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.swaggerResources.definitions')
        angular.mock.module('profitelo.controller.dashboard.service-provider.company-path')
        inject(($rootScope: IRootScopeService, $injector: ng.auto.IInjectorService) => {

          _scope = $rootScope.$new()
          _httpBackend = $injector.get<ng.IHttpBackendService>('$httpBackend')
          _ProfileApiDef = $injector.get('ProfileApiDef')
          _state = $injector.get<ng.ui.IStateService>('$state')
          _controller = $injector.get('$controller')
          _ProfileApi = $injector.get<IProfileApi>('ProfileApi')
          User = $injector.get('User')
          _topAlertService = $injector.get<ITopAlertService>('topAlertService')
          _timeout = $injector.get('$timeout')
          _smoothScrollingService = $injector.get<ISmoothScrollingService>('smoothScrollingService')

          _scope.$parent.serviceProviderController = {
            profileTypes: {
              'INDIVIDUAL': 'INDIVIDUAL',
              'COMPANY': 'COMPANY'
            }
          }

          CompanyPathController = createController(null)

          resourcesExpectations = {
            ProfileApi: {
              postProfile: _httpBackend.when(_ProfileApiDef.postProfile.method, _ProfileApiDef.postProfile.url),
              patchProfile: _httpBackend.when(_ProfileApiDef.patchProfile.method, _ProfileApiDef.patchProfile.url)
            }
          }

        })
      })

      it('should exists', () => {
        spyOn(_smoothScrollingService, 'scrollTo')
        expect(!!CompanyPathController).toBe(true)
        _timeout.flush()
        expect(_smoothScrollingService.scrollTo).toHaveBeenCalledWith(2)
      })

      it('should be able to save account object and redirect to consultation range', () => {

        spyOn(_state, 'go')

        resourcesExpectations.ProfileApi.postProfile.respond(200, {})
        CompanyPathController.saveAccountObject()
        _httpBackend.flush()

        expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.consultation-range.company')

      })

      it('should be able to update account object and redirect to consultation range', () => {

        resourcesExpectations.ProfileApi.patchProfile.respond(200, {})
        CompanyPathController = createController(<Profile>{})

        spyOn(_state, 'go')

        CompanyPathController.saveAccountObject()
        _httpBackend.flush()

        expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.consultation-range.company')

      })

      it('should alert on save error', () => {

        spyOn(_topAlertService, 'error')

        resourcesExpectations.ProfileApi.postProfile.respond(500)
        CompanyPathController.saveAccountObject()
        _httpBackend.flush()

        expect(_topAlertService.error).toHaveBeenCalledWith({message: 'error', timeout: 4})

      })


      it('should enter inEditMode when savedProfile had been initialized', () => {
        CompanyPathController = createController(<Profile>{
          organizationDetails: {}
        })
        expect(CompanyPathController.inEditMode).toBeTruthy()

      })

    })
  })
}
