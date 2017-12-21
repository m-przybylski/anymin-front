import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IRadioBtnTextareaBindings, default as radioBtnTextarea} from './radio-btn-textarea'
import {RadioBtnTextareaComponent} from './radio-btn-textarea.component'
import {IScope} from 'angular'

describe('Unit testing: profitelo.components.interface.radio-btn-textarea', () => {
  return describe('for radioBtnTextarea component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: RadioBtnTextareaComponent
    let bindings: IRadioBtnTextareaBindings
    let document: ng.IDocumentService
    const validHTML = '<radio-btn-textarea></radio-btn-textarea>'
    let injectors: { $scope?: IScope, [key: string]: any }

    function create(html: string, bindings: IRadioBtnTextareaBindings): JQuery {
      scope = rootScope.$new()
      const parentBoundScope = angular.extend(scope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(radioBtnTextarea)
    })

    beforeEach(() => {
      angular.mock.module('pascalprecht.translate')
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        id: 'string',
        name: 'string',
        value: 'string',
        label: 'string',
        ngModel: 'string',
        checkedItem: 'string',
        onSelectedItem: (): void => {
        },
        labelDescription: 'string',
        onDescriptionCallback: (): void => {
        },
        isTextarea: true
      }

      injectors = {
        $element: create(validHTML, bindings),
        $scope: rootScope,
        $document: document
      }

      component = componentController<RadioBtnTextareaComponent, {}>('radioBtnTextarea', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })
  })
})
