import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import modalsModule from '../../../../../../../../services/modals/modals'
import {ModalsService} from '../../../../../../../../services/modals/modals.service'
describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason', () => {
  return describe('for clientComplainReason >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let validHTML = '<client-complain-reason></client-complain-reason>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    let bindings: any = {}

    beforeEach(() => {

      angular.mock.module('profitelo.components.interface.radio-text')
      angular.mock.module(modalsModule)
      angular.mock.module('profitelo.components.interface.radio')
      angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _modalsService_: ModalsService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          modalsService: _modalsService_
        }

        component = componentController('clientComplainReason', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should have a dummy test', inject((modalsService: ModalsService) => {
      spyOn(modalsService, 'createClientComplainReportModal')
      component.showComplainReasonModal()

      expect(modalsService.createClientComplainReportModal).toHaveBeenCalled()

    }))
  })
})
