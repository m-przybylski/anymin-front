namespace profitelo.dashboard.serviceProvider.consultationRange.individual {

  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import Profile = profitelo.models.Profile
  import IServiceApi = profitelo.api.IServiceApi

  describe('Unit tests: profitelo.controller.dashboard.service-provider.consultation-range.individual >', () => {
  describe('Testing Controller: IndividualConsultationController', () => {

    var IndividualConsultationController: any
    let _scope: any
    let url = 'awesomeUrl'
    let _state: ng.ui.IStateService
    let _ServiceApiDef: any
    let resourcesExpectations: any
    let _httpBackend: ng.IHttpBackendService
    let _topAlertService: ITopAlertService
    let _ServiceApi: IServiceApi
    let _controller: any

    function createController(controller: any, savedProfile: Profile | null, profileImage: string) {
      IndividualConsultationController = controller('IndividualConsultationController', {
        $scope: _scope,
        ServiceApi: _ServiceApi,
        savedProfile: savedProfile,
        profileImage: profileImage,
        $state: _state,
        topAlertService: _topAlertService
      })
    }

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.controller.dashboard.service-provider.consultation-range.individual')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService,
              $injector: ng.auto.IInjectorService, _$state_: ng.ui.IStateService, _ServiceApi_: IServiceApi,
              _topAlertService_: ITopAlertService) => {

        _scope = $rootScope.$new()
        _state = _$state_
        _httpBackend = $httpBackend
        _topAlertService = _topAlertService_
        _ServiceApi = _ServiceApi_
        _controller = $controller


        createController(_controller,<any>{
          expertDetails: {
            id: 1
          },
          organizationDetails: undefined
        }, '')

        _ServiceApiDef = $injector.get('ServiceApiDef')

        resourcesExpectations = {
          ServiceApi: {
            postService: $httpBackend.when(_ServiceApiDef.postService.method, _ServiceApiDef.postService.url),
            deleteService: $httpBackend.when(_ServiceApiDef.deleteService.method, _ServiceApiDef.deleteService.url)
          }
        }

      })
    })

    it('should exists', () => {
      return expect(!!IndividualConsultationController).toBe(true)
    })

    it('should be able to save conslultation', () => {

      resourcesExpectations.ServiceApi.postService.respond(200, {})

      spyOn(_state, 'reload')

      IndividualConsultationController.addAnotherConsultation()
      _httpBackend.flush()

      expect(_state.reload).toHaveBeenCalled()

    })

    it('should alert on save conslultation fail', () => {

      resourcesExpectations.ServiceApi.postService.respond(500)

      spyOn(_topAlertService, 'error')

      IndividualConsultationController.addAnotherConsultation()
      _httpBackend.flush()

      expect(_topAlertService.error).toHaveBeenCalledWith({ message: 'error', timeout: 4 })

    })

    it('should transfer to first individual step based on creator type', () => {

      spyOn(_state, 'go')

      IndividualConsultationController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')

    })

    it('should transfer to first company step based on creator type', () => {

      spyOn(_state, 'go')

      createController(_controller, <Profile>{
        expertDetails: undefined,
        organizationDetails: undefined
      }, '')

      IndividualConsultationController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')

    })

    it('should delete requested consultation', () => {

      resourcesExpectations.ServiceApi.deleteService.respond(200, {})

      IndividualConsultationController.consultations = []

      IndividualConsultationController.deleteConsultation(':serviceId', 1)

    })

    it('should fail on delete requested consultation error', () => {

      resourcesExpectations.ServiceApi.deleteService.respond(500)

      spyOn(_topAlertService, 'error')

      IndividualConsultationController.consultations = []

      IndividualConsultationController.deleteConsultation(':serviceId', 1)


    })

    it('should transfer to first individual step based on creator type', () => {

      spyOn(_state, 'go')

      IndividualConsultationController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')

    })

  })
})
}
