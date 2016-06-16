describe('Unit tests: CompanyPathController >', () => {
  describe('Testing Controller: CompanyPathController', () => {

    var CompanyPathController
    let _scope
    let _httpBackend
    let _ProfileApi
    let _ProfileApiDef
    let _User
    let resourcesExpectations
    let _controller
    let _state
    let _proTopAlertService
    let _timeout
    let _smoothScrolling

    let url = 'awesomeUrl/'

    let createController = (profile) => {
      return _controller('CompanyPathController', {
        $scope: _scope,
        ProfileApi: _ProfileApi,
        User: _User,
        savedProfile: profile,
        smoothScrolling: _smoothScrolling
      })
    }


    beforeEach(module(function ($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.swaggerResources.definitions')
      module('profitelo.controller.dashboard.service-provider.company-path')
      inject(($rootScope, $injector) => {

        _scope = $rootScope.$new()
        _httpBackend = $injector.get('$httpBackend')
        _ProfileApiDef = $injector.get('ProfileApiDef')
        _state = $injector.get('$state')
        _controller = $injector.get('$controller')
        _ProfileApi = $injector.get('ProfileApi')
        _User = $injector.get('User')
        _proTopAlertService = $injector.get('proTopAlertService')
        _timeout = $injector.get('$timeout')
        _smoothScrolling = $injector.get('smoothScrolling')

        _scope.$parent.serviceProviderController = {
          profileTypes: {
            'INDIVIDUAL': 'INDIVIDUAL',
            'COMPANY': 'COMPANY'
          }
        }

        CompanyPathController = createController()

        resourcesExpectations = {
          ProfileApi: {
            postProfile: _httpBackend.when(_ProfileApiDef.postProfile.method, _ProfileApiDef.postProfile.url),
            putProfile: _httpBackend.when(_ProfileApiDef.putProfile.method, _ProfileApiDef.putProfile.url)
          }
        }

      })
    })

    it('should exists', () => {
      spyOn(_smoothScrolling, 'scrollTo')
      expect(!!CompanyPathController).toBe(true)
      _timeout.flush()
      expect(_smoothScrolling.scrollTo).toHaveBeenCalledWith(2)
    })

    it('should be able to save account object and redirect to consultation range', () => {

      spyOn(_state, 'go')

      resourcesExpectations.ProfileApi.postProfile.respond(200)
      CompanyPathController.saveAccountObject()
      _httpBackend.flush()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.consultation-range.company')

    })

    it('should be able to update account object and redirect to consultation range', () => {

      resourcesExpectations.ProfileApi.putProfile.respond(200)
      CompanyPathController = createController({})

      spyOn(_state, 'go')

      CompanyPathController.saveAccountObject()
      _httpBackend.flush()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.consultation-range.company')

    })

    it('should alert on save error', () => {

      spyOn(_proTopAlertService, 'error')

      resourcesExpectations.ProfileApi.postProfile.respond(500)
      CompanyPathController.saveAccountObject()
      _httpBackend.flush()

      expect(_proTopAlertService.error).toHaveBeenCalledWith({ message: 'error', timeout: 4 })

    })


    it('should enter inEditMode when savedProfile had been initialized', () => {
      CompanyPathController = createController({
        organizationDetails: {}
      })
      expect(CompanyPathController.inEditMode).toBeTruthy()

    })

  })
})
