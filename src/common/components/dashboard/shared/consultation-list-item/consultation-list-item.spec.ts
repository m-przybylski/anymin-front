import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import consultationListItemModule from './consultation-list-item';
import IScope = angular.IScope;
import {ConsultationListItemComponentController} from './consultation-list-item.controller';

describe('Unit testing: profitelo.components.dashboard.shared.consultation-list-item', () => {
  return describe('for consultationListItem', () => {

    let scope: IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: ConsultationListItemComponentController
    let validHTML = '<consultation-list-item></consultation-list-item>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module(consultationListItemModule)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController<ConsultationListItemComponentController, {}>('consultationListItem', {}, {})
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
