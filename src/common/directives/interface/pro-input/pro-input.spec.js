describe('Unit testing: profitelo.directives.interface.pro-input', () => {
  return describe('for interface.pro-input directive >', () => {

    let scope     = null
    let rootScope
    let compile   = null
    let validHTML = '<pro-input data-label="LABEL" data-placeholder="PLACEHOLDER"  required></pro-input>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.interface.pro-input')

      inject(($rootScope, $compile ) => {
        rootScope             = $rootScope.$new()
        compile               = $compile
      })
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should create element with text', () => {
      let addonInput = '<pro-input data-addon-text="RANDOM-TEXT"></pro-input>'
      let el = create(addonInput)
      expect(el.html()).toBeDefined(true)
    })

    it('should focus input', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      spyOn(isoScope, 'focusInput').and.callThrough()
      el.click()
      expect(isoScope.focusInput).toHaveBeenCalled()
    })

    it('should change focus param on mouseover', ()=>{
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      $(el).trigger('mouseover')
      expect(isoScope.focus).toBeTruthy()
    })

    it('should change focus param on mouseout', ()=>{
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      $(el).trigger('mouseout')
      expect(isoScope.focus).toBeFalsy()
    })
  })
})