namespace profitelo.directives.expertProfile.proExpertSingleConsultation {
describe('Unit testing: profitelo.directives.expert-profile.pro-expert-single-consultation', () => {
  return describe('for expert-profile.pro-expert-single-consultation directive >', () => {

    let scope: any = null
    let rootScope: ng.IRootScopeService
    let compile: any = null
    let validHTML = '<pro-expert-single-consultation data-service-tags-employees-tuple="serviceTagsEmployeesTuple"></pro-expert-single-consultation>'

    const callService = {
      callServiceId: () => {}
    }

    beforeEach(() => {
    angular.mock.module('profitelo.services.call')
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('callService', callService)
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.services.url')
    angular.mock.module('profitelo.directives.expert-profile.pro-expert-single-consultation')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        rootScope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      scope.serviceTagsEmployeesTuple = {
        ownerProfile: {
          organizationDetails: {

          }
        },
        service: {
          id: 'sdsdsdsd2323'
        }
      }
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should call service', () => {
      const el = create(validHTML)
      const isolatedScope = el.isolateScope()
      spyOn(callService, 'callServiceId')
      isolatedScope.startCall()
      expect(callService.callServiceId).toHaveBeenCalled()
    })
  })
})
}
