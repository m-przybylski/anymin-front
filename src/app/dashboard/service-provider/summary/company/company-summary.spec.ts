describe('Unit tests: CompanySummaryController >', () => {
  describe('Testing Controller: CompanySummaryController', () => {

    let CompanySummaryController
    let _scope
    let _state
    let _ServiceApiDef
    let _httpBackend
    let _proTopAlertService
    let _ServiceApi
    let _controller
    let resourcesExpectations

    let url = 'awesomeUrl/'

    function createController(controller, savedProfile, profileAvatar, companyLogo) {
      CompanySummaryController = controller('CompanySummaryController', {
        $scope: _scope,
        ServiceApi: _ServiceApi,
        savedProfile: savedProfile,
        $state: _state,
        profileAvatar: profileAvatar,
        companyLogo: companyLogo,
        proTopAlertService: _proTopAlertService
      })
    }

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.controller.dashboard.service-provider.summary.company')
      inject(($rootScope, $controller, $httpBackend, $injector, _$state_, _ServiceApi_, _proTopAlertService_) => {

        _scope = $rootScope.$new()
        _state = _$state_
        _httpBackend = $httpBackend
        _proTopAlertService = _proTopAlertService_
        _ServiceApi = _ServiceApi_
        _controller = $controller

        createController(_controller, {
          expertDetails: {
            d: 1
          },
          organizationDetails: {}
        }, {}, {})

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

      createController(_controller, {
        expertDetails: {
          d: 1
        },
        organizationDetails: null
      }, {}, {})

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