import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import noResultsInformationModule, {INoResultsInformationComponentBindings} from './no-results-information'
import IScope = angular.IScope;
import {NoResultsInformationController} from './no-results-information.controller'

describe('Unit testing: profitelo.components.dashboard.no-results-information-message', () => {
  return describe('for noResultsInformation >', () => {

    let scope: IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: any
    const validHTML = '<no-results-information></no-results-information>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module(noResultsInformationModule)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      const bindings: INoResultsInformationComponentBindings = {
        iconSrc: 'img',
        informationTitle: 'title',
        informationDescription: 'title description',
        buttonTitle: 'btn title',
        buttonClass: 'class',
        buttonIconLeftClass: 'let icon',
        buttonIconRightClass: 'righticon',
        buttonOnClick: (): void => {}
      }

      component = componentController<NoResultsInformationController, {}>('noResultsInformation', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should call buttonCallback', () => {
      spyOn(component, 'buttonOnClick')
      component.buttonCallback()
      expect(component.buttonOnClick).toHaveBeenCalled()
    })
  })
})
