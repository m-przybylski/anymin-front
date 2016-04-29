describe('Unit testing: profitelo.directives.interface.pro-alert', () => {
  return describe('for interface.pro-alert directive >', () => {

    let scope     = null
    let rootScope
    let compile   = null
    let _proTopAlertsService
    let validHTML = '<pro-alert></pro-alert>'
    let $timeout

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.interface.pro-alert')

      inject(($rootScope, $compile, _proTopAlertService_, $injector) => {
        rootScope             = $rootScope.$new()
        compile               = $compile
        _proTopAlertsService  = _proTopAlertService_
        $timeout              = $injector.get('$timeout')
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

    /*
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
    */

    it('should create success alert', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      _proTopAlertsService.success()
      expect(isoScope.alerts.length > 0).toBe(true)
    })

    it('should create success alert with params', () => {
      let params = {
        message: 'RANDOM_MESSAGE',
        timeout: 2
      }
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      _proTopAlertsService.success(params)
      expect(_.find(isoScope.alerts, function(o) {
        return o.message === 'RANDOM_MESSAGE' &&
          o.timeout === 2
      }) !== undefined).toBe(true)
    })

    it('should create error alert', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      _proTopAlertsService.error()
      expect(isoScope.alerts.length > 0).toBe(true)
    })

    it('should create error alert with params', () => {
      let params = {
        message: 'RANDOM_MESSAGE',
        timeout: 2
      }
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      _proTopAlertsService.error(params)
      expect(_.find(isoScope.alerts, function(o) {
        return o.message === 'RANDOM_MESSAGE' &&
        o.timeout === 2
      }) !== undefined).toBe(true)
    })
    it('should create warning alert', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      _proTopAlertsService.warning()
      expect(isoScope.alerts.length > 0).toBe(true)
    })

    it('should create warning alert with params', () => {
      let params = {
        message: 'RANDOM_MESSAGE',
        timeout: 2
      }
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      _proTopAlertsService.warning(params)
      expect(_.find(isoScope.alerts, function(o) {
        return o.message === 'RANDOM_MESSAGE' &&
        o.timeout === 2
      }) !== undefined).toBe(true)
    })
    it('should create info alert', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      _proTopAlertsService.info()
      expect(isoScope.alerts.length > 0).toBe(true)
    })

    it('should create info alert with params and destroy it after timeout', () => {
      let params = {
        message: 'RANDOM_MESSAGE',
        timeout: 2
      }
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      _proTopAlertsService.info(params)
      expect(_.find(isoScope.alerts, function(o) {
        return o.message === 'RANDOM_MESSAGE' &&
        o.timeout === 2
      }) !== undefined).toBe(true)
      $timeout.flush()
      expect(isoScope.alerts.length === 0).toBe(true)
    })
  })
})
