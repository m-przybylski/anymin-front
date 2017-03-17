import * as angular from 'angular'
import './company-profile'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
describe('Unit testing: profitelo.components.invitations.company-profile', () => {
  return describe('for company-profile-component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let validHTML = '<company-profile data-avatar="vm.invitations.organizationDetails.logoUrl" ' +
      'data-profile="vm.invitations.organizationDetails"></company-profile>'

    beforeEach(() => {

      angular.mock.module('profitelo.components.invitations.company-profile')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('companyProfile', null, {})

    })

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
