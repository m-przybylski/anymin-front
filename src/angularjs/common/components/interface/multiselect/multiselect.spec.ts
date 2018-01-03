namespace profitelo.components.interface.multiselect {
  
  describe('Unit testing: profitelo.components.summary-tag-multiselect', () => {
    return describe('for summaryTagMultiselectComponent >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      const validHTML = '<multiselect data-tags="[\'sadasdasd\']" data-on-select-change="true" data-title="title"></multiselect>'

      const bindings: any = {
        tags: (): void => {
        },
        title: 'title',
        onSelectChange: true
      }

      function create(html: string): JQuery {
        scope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.interface.multiselect')

        inject(($rootScope: any, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
        })

        component = componentController('multiselect', {$element: create(validHTML), $scope: scope}, bindings)

      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the directive', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

      it('should call on select change on toggle items', () => {
        spyOn(component, 'onSelectChange')
        component.toggleItem('sadasdasd')
        component.toggleItem('sadasdasd')
        expect(component.onSelectChange).toHaveBeenCalled()
      })

      it('should checked tags array', () => {
        const item = 'sdfsdfsf'
        const isChecked = component.isChecked(item)
        expect(isChecked).toBe(false)
      })

    })
  })
}
