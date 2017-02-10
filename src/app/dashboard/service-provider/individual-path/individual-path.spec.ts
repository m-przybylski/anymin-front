namespace profitelo.dashboard.serviceProvider.individualPath {
import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import Profile = profitelo.models.Profile
  describe('Unit tests: IndividualPathController >', () => {
  describe('Testing Controller: IndividualPathController', () => {

    let IndividualPathController: any
    let _scope: any
    let _httpBackend: ng.IHttpBackendService
    let _ProfileApi: any
    let _ProfileApiDef: any
    let _User: any
    let resourcesExpectations: any
    let _controller: any
    let _state: ng.ui.IStateService
    let _topAlertService: ITopAlertService
    let _timeout: ng.ITimeoutService
    let _smoothScrollingService: ISmoothScrollingService

    let url = 'awesomeUrl/'

    let createController = (profile: Profile | null) => {
      return _controller('IndividualPathController', {
        $scope: _scope,
        ProfileApi: _ProfileApi,
        User: _User,
        savedProfile: profile,
        smoothScrollingService: _smoothScrollingService
      })
    }

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.controller.dashboard.service-provider.individual-path')
      inject(($rootScope: ng.IRootScopeService, $injector: ng.auto.IInjectorService) => {

        _scope = $rootScope.$new()
        _httpBackend = $injector.get('$httpBackend')
        _ProfileApiDef = $injector.get('ProfileApiDef')
        _state = $injector.get<ng.ui.IStateService>('$state')
        _controller = $injector.get('$controller')
        _ProfileApi = $injector.get('ProfileApi')
        _User = $injector.get('User')
        _topAlertService = $injector.get<ITopAlertService>('topAlertService')
        _timeout = $injector.get('$timeout')
        _smoothScrollingService = $injector.get<ISmoothScrollingService>('smoothScrollingService')


        IndividualPathController = createController(null)

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

      _timeout.flush()
      expect(!!IndividualPathController).toBe(true)
      expect(_smoothScrollingService.scrollTo).toHaveBeenCalledWith(2)
    })

    it('should be able to save account object and redirect to consultation range', () => {

      spyOn(_state, 'go')

      resourcesExpectations.ProfileApi.postProfile.respond(200)
      IndividualPathController.saveAccountObject()
      _httpBackend.flush()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.consultation-range.individual')

    })


    it('should be able to save account object and redirect to provider summary', () => {

      IndividualPathController = createController(<Profile>{
        organizationDetails: {}
      })

      spyOn(_state, 'go')

      resourcesExpectations.ProfileApi.patchProfile.respond(200)
      IndividualPathController.saveAccountObject()
      _httpBackend.flush()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.summary.company')

    })

    it('should alert on save error', () => {

      spyOn(_topAlertService, 'error')

      resourcesExpectations.ProfileApi.postProfile.respond(500)
      IndividualPathController.saveAccountObject()
      _httpBackend.flush()

      expect(_topAlertService.error).toHaveBeenCalledWith({ message: 'error', timeout: 4 })

    })


    it('should enter inEditMode when savedProfile had been initialized', () => {
      IndividualPathController = createController(<Profile>{
        expertDetails: {}
      })
      expect(IndividualPathController.inEditMode).toBeTruthy()

    })



  })
})
}
