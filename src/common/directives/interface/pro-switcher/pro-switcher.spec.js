describe('Unit testing: profitelo.directives.interface.pro-input-switcher', () => {
  return describe('for interface.pro-input-switcher directive >', () => {

    let scope     = null
    let rootScope
    let compile   = null
    let validHTML = '<pro-switcher ng-model="isChecked" data-label="LABEL" id data-name="NAME" ></pro-switcher>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.interface.pro-switcher')

      inject(($rootScope, $compile ) => {
        rootScope             = $rootScope.$new()
        compile               = $compile
      })
    })

    function create(html, isChecked) {
      scope = rootScope.$new()

      scope.isChecked = isChecked

      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML, true)
      expect(el.html()).toBeDefined(true)
    })

    it('should be isChecked after click in checkbox', () => {
      let el = create(validHTML, false)
      let isoScope = el.isolateScope()
      $(el).find('.checkbox-switcher').triggerHandler('click')
      expect(isoScope.ngModel).toEqual(true)
    })

    it('should throw error if bad model provided', () => {

      expect(() => { create(validHTML, 'false') }).toThrow(new Error('ngModel must be of boolean type'))

    })


  })
})