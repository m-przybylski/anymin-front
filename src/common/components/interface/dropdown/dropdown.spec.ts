namespace profitelo.components.interface.dropdown {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.interface.drop-down', () => {
    return describe('for dropdown component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let bindings: any
      let scope: any
      let document: ng.IDocumentService
      const validHTML = '<dropdown-input data-label="asd" data-icon="icon"></dropdown-input>'

      function create(html: string): JQuery {
        scope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.interface.dropdown')
        angular.mock.module('pascalprecht.translate')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
                _$componentController_: ng.IComponentControllerService, _$document_: ng.IDocumentService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
          document = _$document_
        })

        bindings = {
          label: 'test',
          icon: 'icon',
          mainList: [],
          secondaryList: [],
          inputPlaceholder: 'placeholder',
          onSelectMain: (): void => {
          },
          onSelectSecond: (): void => {
          },
          selectedItem: {}
        }

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          $document: document
        }

        component = componentController('dropdownInput', injectors, bindings)
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

      it('should onItemChecked', () => {
        const item = {
          value: 0
        }
        component.onSecondaryItemSelect(item)
        expect(component.isOpen).toEqual(true)
        expect(component.isActive).toEqual(0)
        expect(component.selectedItem).toEqual(item)
      })

      it('should toggleDropdown', () => {
        component.toggleDropdown()
        expect(component.isOpen).toBeTruthy()
      })

      it('should onMainItemSelect', () => {
        const item = {
          value: 0
        }
        spyOn(component, 'onSelectMain')
        component.onMainItemSelect(item)
        expect(component.activeItem).toEqual(item)
        expect(component.onSelectMain).toHaveBeenCalledWith(item)
      })

      it('should $document.bind', () => {
        component.filterBy = {
          name: ''
        }
        spyOn(component.filterBy, 'name')
        document.trigger('click')
        document.bind(event)
        expect(component.filterBy.name).toEqual('')
        expect(component.isOpen).toBeFalsy()
        scope.$digest()
      })
    })
  })
}
