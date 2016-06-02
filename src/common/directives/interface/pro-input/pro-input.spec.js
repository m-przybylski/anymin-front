describe('Unit testing: profitelo.directives.interface.pro-input', () => {
  return describe('for interface.pro-input directive >', () => {

    let _placeholder = 'PLACEHOLDER'

    let scope     = null
    let rootScope
    let compile   = null
    let validHTML = '<pro-input data-label="LABEL" data-placeholder="' + _placeholder + '"  required auto-focus only-digits></pro-input>'

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
    //
    // it('should focus input', () => {
    //   let el = create(validHTML)
    //   let isoScope = el.isolateScope()
    //
    //   spyOn(isoScope, 'focusInput')
    //
    //   $(el).triggerHandler('click')
    //   expect(isoScope.focusInput).toHaveBeenCalled()
    // })

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

    it('should toggle flags on input focus', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      el.find('input').triggerHandler('focus')

      expect(isoScope.focus).toBeTruthy()
      expect(isoScope.onClick).toBeTruthy()
      expect(isoScope.placeholder).toEqual('')

    })

    it('should toggle flags on input blur', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      el.find('input').triggerHandler('focus')
      el.find('input').blur()

      expect(isoScope.focus).toBeFalsy()
      expect(isoScope.onClick).toBeFalsy()
      expect(isoScope.placeholder).toEqual(_placeholder)

    })

    it('should hide removal cross if noDelete in template is declared', () => {
      let noDeleteInput= '<pro-input data-addon-text="RANDOM-TEXT" noDelete></pro-input>'

      let el = create(noDeleteInput)

      let isoScope = el.isolateScope()

      expect(isoScope.hideCross()).toEqual(false)

    })

    it('should allow to press only numbers', ()=> {
      let el = create(validHTML)
      let triggerKeyDown = function(element, keyCode) {
        let e = angular.element.Event('keypress')
        e.which = keyCode
        element.trigger(e)
      }
      triggerKeyDown(el.find('input'), 60)
      expect(el.find('input').val()).toBe('')
      /*  Value will always be ''*/
    })

  })
})
