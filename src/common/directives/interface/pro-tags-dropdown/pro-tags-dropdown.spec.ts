describe('Unit testing: profitelo.directives.interface.pro-tags-dropdown', () => {
  return describe('for interface.pro-tags-dropdown directive >', () => {

    let scope: any     = null
    let rootScope
    let compile: any   = null
    let validHTML = '<pro-tags-dropdown pro-model="RANDOM" disable-tagging no-search></pro-tags-dropdown>'
    let timeout
    
    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.interface.pro-tags-dropdown')

      inject(($rootScope, $compile, _$timeout_ ) => {
        rootScope             = $rootScope.$new()
        compile               = $compile
        timeout               = _$timeout_
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

    it('should transform tag', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.tagTransform('123123')
      expect(isoScope.valid).toEqual(false)
    })

    it('should  not transform tag', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.validPattern = '12313'
      isoScope.tagTransform('123123')
      expect(isoScope.valid).toEqual(true)
    })

    it('should select tag', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.proModel = []
      isoScope.select()
      isoScope.searchEnable()
      expect(isoScope.valid).toEqual(false)
      expect(isoScope.proModel.length === 1).toBe(true)
    })

    it('should remove tag and update perfect scroll-bar', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.proModel = ['a']
      isoScope.remove('a')
      isoScope.update()
      timeout.flush()
      expect(isoScope.proModel.length === 0).toBe(true)
    })

    it('should focus input', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      el.find('.ui-select-container').triggerHandler('click')
      isoScope.onFocus()
      expect(isoScope.focus).toBe(true)
      expect(isoScope.onClick).toBe(true)
    })

    it('should block enter key', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      const event = {
        keyCode: 38,
        preventDefault: () => {
          
        }
      }
      const select = {
        search: () => {
          
        }
      }
      spyOn(event, 'preventDefault')
      isoScope.onKeypress(event, select)
      timeout.flush()
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('should block enter key', () => {
      let el = create('<pro-tags-dropdown pro-model="RANDOM" disable-tagging disable-typing  no-search></pro-tags-dropdown>')
      let isoScope = el.isolateScope()
      const event = {
        keyCode: 38,
        preventDefault: () => {

        }
      }
      spyOn(event, 'preventDefault')
      isoScope.onKeypress(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

  })
})
