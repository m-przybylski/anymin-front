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
    let _topAlertService
    let _timeout
    let _smoothScrollingService

    let url = 'awesomeUrl/'

    let createController = (profile) => {
      return _controller('IndividualPathController', {
        $scope: _scope,
        ProfileApi: _ProfileApi,
        User: _User,
        savedProfile: profile,
        smoothScrollingService: _smoothScrollingService
      })
    }

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.controller.dashboard.service-provider.individual-path')
      inject(($rootScope: ng.IRootScopeService, $injector) => {

        _scope = $rootScope.$new()
        _httpBackend = $injector.get('$httpBackend')
        _ProfileApiDef = $injector.get('ProfileApiDef')
        _state = $injector.get('$state')
        _controller = $injector.get('$controller')
        _ProfileApi = $injector.get('ProfileApi')
        _User = $injector.get('User')
        _topAlertService = $injector.get('topAlertService')
        _timeout = $injector.get('$timeout')
        _smoothScrollingService = $injector.get('smoothScrollingService')


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

      spyOn(_topAlertService, 'error')

      resourcesExpectations.ProfileApi.postProfile.respond(500)
      IndividualPathController.saveAccountObject()
      _httpBackend.flush()

      expect(_topAlertService.error).toHaveBeenCalledWith({ message: 'error', timeout: 4 })

    })


    it('should enter inEditMode when savedProfile had been initialized', () => {
      IndividualPathController = createController({
        expertDetails: {}
      })
      expect(IndividualPathController.inEditMode).toBeTruthy()

    })



  })
})
