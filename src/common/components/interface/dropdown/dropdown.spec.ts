describe('Unit testing: profitelo.components.interface.drop-down', () => {
  return describe('for dropDown component >', () => {

    let rootScope
    let compile
    let componentController
    let component
    let bindings
    let scope
    let document
    let validHTML = '<dropdown-input data-label="asd" data-icon="icon"></dropdown-input>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.interface.dropdown')

      inject(($rootScope, $compile, _$componentController_, _$document_) => {
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
        onSelectMain: _ => _,
        onSelectSecond: _ => _,
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

