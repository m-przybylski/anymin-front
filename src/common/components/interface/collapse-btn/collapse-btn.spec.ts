describe('Unit testing: profitelo.components.interface.collapse-btn', () => {
  return describe('for collapseBtn component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let window
    let stylesObject
    let validHTML = '<collapse-btn data-title="title" data-icon="icon"></collapse-btn>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    const bindings = {
      title: '@',
      icon: '@'
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('pascalprecht.translate')
    angular.mock.module('profitelo.components.interface.collapse-btn')

      inject(($rootScope, $compile, _$componentController_, _$window_, _$log_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        window = _$window_

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          $window: window,
          $log: _$log_
        }

        stylesObject = {
          minHeight: 1
        }

        component = componentController('collapseBtn', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should collapseToggle', () => {
      const el = create(validHTML)
      el.find('.btn.collapse-btn-header').triggerHandler('click')
    })

    it('should collapseToggle', () => {
      component.stylesObject.minHeight = 12
      component.collapseToggle()
      component.collapseToggle()
      expect(component.stylesObject.minHeight).toEqual(0)
    })
  })
})

