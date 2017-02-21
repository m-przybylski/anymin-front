namespace profitelo.dashboard.serviceProvider.summary.company {

  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import Profile = profitelo.models.Profile
  import IServiceApi = profitelo.api.IServiceApi

  describe('Unit tests: CompanySummaryController >', () => {
    describe('Testing Controller: CompanySummaryController', () => {

      let CompanySummaryController: any
      let _scope: any
      let _state: ng.ui.IStateService
      let _ServiceApiDef: any
      let _httpBackend: ng.IHttpBackendService
      let _topAlertService: ITopAlertService
      let _ServiceApi: IServiceApi
      let _controller: any
      let resourcesExpectations: any

      let url = 'awesomeUrl/'

      function createController(controller: any, savedProfile: Profile, profileAvatar: string, companyLogo: string) {
        CompanySummaryController = controller('CompanySummaryController', {
          $scope: _scope,
          ServiceApi: _ServiceApi,
          savedProfile: savedProfile,
          $state: _state,
          profileAvatar: profileAvatar,
          companyLogo: companyLogo,
          topAlertService: _topAlertService
        })
      }

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', url)
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.swaggerResources.definitions')
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.controller.dashboard.service-provider.summary.company')
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService,
                $injector: ng.auto.IInjectorService, _$state_: ng.ui.IStateService, _ServiceApi_: IServiceApi,
                _topAlertService_: ITopAlertService) => {

          _scope = $rootScope.$new()
          _state = _$state_
          _httpBackend = $httpBackend
          _topAlertService = _topAlertService_
          _ServiceApi = _ServiceApi_
          _controller = $controller

          createController(_controller, <any>{
            expertDetails: {
              d: 1
            },
            organizationDetails: {}
          }, '', '')

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
        return expect(!!CompanySummaryController).toBe(true)
      })

      it('should delete requested consultation', () => {

        createController(_controller, <any>{
          expertDetails: {
            id: 1
          },
          organizationDetails: undefined
        }, '', '')

        resourcesExpectations.ServiceApi.deleteService.respond(200)

        CompanySummaryController.consultations = [{name: '121'}]

        CompanySummaryController.deleteConsultation(':serviceId', 1)

      })

      it('should fail on delete requested consultation error', () => {

        resourcesExpectations.ServiceApi.deleteService.respond(500)

        CompanySummaryController.consultations = []

        CompanySummaryController.deleteConsultation(':serviceId', 1)

      })

      it('should transfer to first company step', () => {

        spyOn(_state, 'go')

        CompanySummaryController.backToFirstStep()

        expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')

      })

      it('should transfer to first individual step ', () => {

        spyOn(_state, 'go')

        CompanySummaryController.goToExpertEdit()

        expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')

      })

    })
  })
}
