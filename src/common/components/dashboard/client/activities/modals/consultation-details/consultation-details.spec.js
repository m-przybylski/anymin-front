describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details', () => {
  return describe('for clientConsultationDetails >', () => {

    let rootScope
    let compile
    let componentController



    beforeEach(() => {
      module('templates-module')
      module('profitelo.swaggerResources')
      module('profitelo.services.helper')


      inject(($rootScope, $compile, _$componentController_, _HelperService_, _$log_, _$httpBackend_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          HelperService: _HelperService_,
          log: _$log_,
          httpBackend: _$httpBackend_
        }


      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

  })
})
