describe('Unit tests: IndividualSummaryController >', () => {
  describe('Testing Controller: IndividualSummaryController', () => {

    let IndividualSummaryController
    let _scope
    let _state
    let _ServiceApiDef
    let _httpBackend
    let _proTopAlertService
    let _ServiceApi
    let _controller
    let resourcesExpectations

    let url = 'awesomeUrl/'

    function createController(controller, savedProfile, profileImage) {
      IndividualSummaryController = controller('IndividualSummaryController', {
        $scope: _scope,
        ServiceApi: _ServiceApi,
        savedProfile: savedProfile,
        $state: _state,
        profileImage: profileImage,
        proTopAlertService: _proTopAlertService
      })
    }

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.swaggerResources.definitions')
      module('templates-module')
      module('profitelo.controller.dashboard.service-provider.summary.individual')
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
          organizationDetails: null
        })

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
      return expect(!!IndividualSummaryController).toBe(true)
    })

    it('should delete requested consultation', () => {

      resourcesExpectations.ServiceApi.deleteService.respond(200)

      IndividualSummaryController.consultations = [{name: '123'}]

      IndividualSummaryController.deleteConsultation(':serviceId', 1)

    })

    it('should fail on delete requested consultation error', () => {

      resourcesExpectations.ServiceApi.deleteService.respond(500)

      IndividualSummaryController.consultations = []

      IndividualSummaryController.deleteConsultation(':serviceId', 1)

    })

  })
})