describe('Unit tests: IndividualPathController >', () => {
  describe('Testing Controller: IndividualPathController', () => {

    let IndividualPathController
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
      return _controller('IndividualPathController', {
        $scope: _scope,
        ProfileApi: _ProfileApi,
        User: _User,
        savedProfile: profile,
        smoothScrolling: _smoothScrolling
      })
    }

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))
    
    beforeEach(() => {
      module('profitelo.swaggerResources.definitions')
      module('profitelo.controller.dashboard.service-provider.individual-path')
      inject(($rootScope, $controller, $injector) => {

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

      spyOn(_smoothScrolling, 'scrollTo')

      _timeout.flush()
      expect(!!IndividualPathController).toBe(true)
      expect(_smoothScrolling.scrollTo).toHaveBeenCalledWith(2)
    })

    it('should be able to save account object and redirect to consultation range', () => {

      spyOn(_state, 'go')

      resourcesExpectations.ProfileApi.postProfile.respond(200)
      IndividualPathController.saveAccountObject()
      _httpBackend.flush()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.consultation-range.individual')

    })


    it('should be able to save account object and redirect to provider summary', () => {

      IndividualPathController = createController({
        organizationDetails: {}
      })

      spyOn(_state, 'go')

      resourcesExpectations.ProfileApi.patchProfile.respond(200)
      IndividualPathController.saveAccountObject()
      _httpBackend.flush()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.summary.company')

    })

    it('should alert on save error', () => {

      spyOn(_proTopAlertService, 'error')

      resourcesExpectations.ProfileApi.postProfile.respond(500)
      IndividualPathController.saveAccountObject()
      _httpBackend.flush()

      expect(_proTopAlertService.error).toHaveBeenCalledWith({ message: 'error', timeout: 4 })

    })


    it('should enter inEditMode when savedProfile had been initialized', () => {
      IndividualPathController = createController({
        expertDetails: {}
      })
      expect(IndividualPathController.inEditMode).toBeTruthy()

    })



  })
})
