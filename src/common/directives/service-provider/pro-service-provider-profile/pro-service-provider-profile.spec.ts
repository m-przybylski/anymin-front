namespace profitelo.directives.serviceProvider.proServiceProviderProfile {
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-profile', function() {
  return describe('for proServiceProviderProfile directive >', function() {

    let compile: ng.ICompileService
    let scope: any
    let sce: ng.ISCEService
    let el: any

    const validHTML = '<pro-service-provider-profile data-name="asdsdfsdf" ' +
      'data-languages="ghfghfgh" data-button-action="vm.buttonAction"  data-avatar="ffff" data-description="vm.description"></pro-service-provider-profile>'

    beforeEach(function() {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.service-provider.pro-service-provider-profile')

      inject(function($rootScope: IRootScopeService, $compile: ng.ICompileService, _$sce_: ng.ISCEService) {
        scope = $rootScope.$new()
        compile = $compile
        sce = _$sce_
      })
    })

    function create(html: string) {
      const elem = angular.element(html)
      scope.vm = {
        description: 'asdasdasd',
        buttonAction: () => {
          return null
        }
      }
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

    it('compile the directive', function() {
      el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.vm = {}
      isoScope.vm.description = 'sdsdsdsdsdsd'
      expect(el.html()).toBeDefined(true)
    })

    it('should call show more text', () =>{
      el = create(validHTML)
      let isoScope = el.isolateScope()
      el.find('.pro-button').triggerHandler('click')
      expect(isoScope.textLimit).toEqual(1000)
    })

    it('should call buttonAction', () =>{
      el = create(validHTML)
      let isoScope = el.isolateScope()
      spyOn(isoScope, 'buttonAction')
      isoScope.onClick()
      expect(isoScope.buttonAction).toHaveBeenCalled()
    })

  })
})}
