describe('Unit testing: profitelo.directives.interface.pro-alert', () => {
  return describe('for interface.pro-alert directive >', () => {

    var scope     = null
    var rootScope
    var compile   = null
    var _proTopAlertsService
    var validHTML = '<pro-alert></pro-alert>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.interface.pro-alert')

      inject(($rootScope, $compile, _proTopAlertService_) => {
        rootScope             = $rootScope.$new()
        compile               = $compile
        _proTopAlertsService  = _proTopAlertService_
      })
    })

    function create(html) {
      scope = rootScope.$new()
      var elem = angular.element(html)
      var compiledElement = compile(elem)(scope)
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

    it('should destroy alert', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      spyOn(isoScope, 'destroyAlert').and.callThrough()
      isoScope.alerts.push({
        header: 'RANDOM_HEADER',
        id: 1
      })
      scope.$digest()
      el.find('.icon-close-16').click()

      scope.$digest()
      expect(isoScope.destroyAlert).toHaveBeenCalledWith(1)
    })
  })
})
