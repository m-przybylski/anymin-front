describe('Unit testing: profitelo.directives.expert-profile.pro-expert-single-consultation', () => {
  return describe('for expert-profile.pro-expert-single-consultation directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<pro-expert-single-consultation data-service-tags-employees-tuple="serviceTagsEmployeesTuple"></pro-expert-single-consultation>'

    const callService = {
      callServiceId: _ => _
    }

    beforeEach(() => {
    angular.mock.module('profitelo.services.call')
    })

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('callService', callService)
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.services.url')
    angular.mock.module('profitelo.directives.expert-profile.pro-expert-single-consultation')

      inject(($rootScope, $compile) => {
        rootScope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
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
