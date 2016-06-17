describe('Unit tests: app.dashboard.service-provider.consultation-range.company >', () => {
  describe('Testing Controller: CompanyConsultationController', () => {

    let CompanyConsultationController
    let _scope
    let url = 'awesomeUrl'
    let _state
    let _ServiceApiDef
    let resourcesExpectations
    let _httpBackend
    let _proTopAlertService
    let _ServiceApi
    let _controller

    function createController(controller, savedProfile, profileImage) {
      CompanyConsultationController = controller('CompanyConsultationController', {
        $scope: _scope,
        ServiceApi: _ServiceApi,
        savedProfile: savedProfile,
        profileImage: profileImage,
        $state: _state,
        proTopAlertService: _proTopAlertService
      })
    }

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.swaggerResources.definitions')
      module('profitelo.controller.dashboard.service-provider.consultation-range.company')
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
      return expect(!!CompanyConsultationController).toBe(true)
    })

    it('should be able to save conslultation', () => {

      resourcesExpectations.ServiceApi.postService.respond(200)

      spyOn(_state, 'reload')

      CompanyConsultationController.addAnotherConsultation()
      _httpBackend.flush()

      expect(_state.reload).toHaveBeenCalled()

    })

    it('should alert on save conslultation fail', () => {

      resourcesExpectations.ServiceApi.postService.respond(500)

      spyOn(_proTopAlertService, 'error')

      CompanyConsultationController.addAnotherConsultation()
      _httpBackend.flush()

      expect(_proTopAlertService.error).toHaveBeenCalledWith({ message: 'error', timeout: 4 })

    })

    it('should transfer to first individual step based on creator type', () => {

      spyOn(_state, 'go')

      CompanyConsultationController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')

    })

    it('should transfer to first company step based on creator type', () => {

      spyOn(_state, 'go')

      createController(_controller, {
        expertDetails: null,
        organizationDetails: null
      })

      CompanyConsultationController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')

    })

    it('should delete requested consultation', () => {

      resourcesExpectations.ServiceApi.deleteService.respond(200)

      CompanyConsultationController.consultations = []

      CompanyConsultationController.deleteConsultation(':serviceId', 1)
      _httpBackend.flush()
    })

    it('should fail on delete requested consultation error', () => {

      resourcesExpectations.ServiceApi.deleteService.respond(500)

      CompanyConsultationController.consultations = []

      CompanyConsultationController.deleteConsultation(':serviceId', 1)
      _httpBackend.flush()
    })

  })
})
