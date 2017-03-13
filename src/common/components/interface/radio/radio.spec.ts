namespace profitelo.components.interface.radio {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.interface.radio', () => {
    return describe('for radio component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let bindings: any
      let scope: any
      let validHTML = '<radio-btn data-label="label" data-name="name" data-id="id" data-value="value"></radio-btn>'

      function create(html: string) {
        scope = rootScope.$new()
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {
        //angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.interface.radio')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
        })

        bindings = {
          label: 'label',
          name: 'name',
          id: 'id',
          ngModel: {},
          value: 'val'
        }

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope
        }

        component = componentController('radioBtn', injectors, bindings)
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

    })
  })
}
