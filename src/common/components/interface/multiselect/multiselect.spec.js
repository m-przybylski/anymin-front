describe('Unit testing: profitelo.components.summary-tag-multiselect', () => {
  return describe('for summaryTagMultiselectComponent >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<multiselect data-tags="[\'sadasdasd\']" data-on-select-change="true" data-title="title"></multiselect>'

    let bindings = {
      tags: _=>_,
      title: 'title',
      onSelectChange: true
    }

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.interface.multiselect')

      inject(($rootScope, $compile, _$componentController_) => {
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
      let el = create(validHTML)
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
