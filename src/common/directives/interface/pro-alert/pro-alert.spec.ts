import * as angular from 'angular'
import * as _ from 'lodash'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {TopAlertService} from '../../../services/top-alert/top-alert.service'
import {IProAlertScope} from './pro-alert'

describe('Unit testing: profitelo.directives.interface.pro-alert', () => {
  return describe('for interface.pro-alert directive >', () => {

    let scope: IProAlertScope
    let rootScope: ng.IRootScopeService
    let compile: any = null
    let _proTopAlertsService: TopAlertService
    const validHTML = '<pro-alert></pro-alert>'
    let $timeout: ng.ITimeoutService

    interface Params {
      timeout: number,
      message: string
    }

    beforeEach(() => {
      angular.mock.module('profitelo.directives.interface.pro-alert')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _topAlertService_: TopAlertService,
              $injector: ng.auto.IInjectorService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        _proTopAlertsService = _topAlertService_
        $timeout = $injector.get('$timeout')
      })
    })

    function create(html: string): JQuery {
      scope = <IProAlertScope>rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should destroy alert', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProAlertScope>()
      spyOn(isoScope, 'destroyAlert').and.callThrough()
      isoScope.alerts.push({
        id: 1,
        visible: true
      })
      scope.$digest()
      el.find('.icon-close-16').click()
      scope.$digest()
      expect(isoScope.destroyAlert).toHaveBeenCalledWith(1)
    })

    it('should create success alert', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProAlertScope>()
      _proTopAlertsService.success({})
      expect(isoScope.alerts.length > 0).toBe(true)
    })

    it('should create success alert with params', () => {
      const params = {
        message: 'RANDOM_MESSAGE',
        timeout: 2
      }
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProAlertScope>()
      _proTopAlertsService.success(params)
      const found = _.find(isoScope.alerts, (o: Params) => o.message === 'RANDOM_MESSAGE' && o.timeout === 2)
      expect(found !== undefined).toBe(true)
    })

    it('should create error alert', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProAlertScope>()
      _proTopAlertsService.error({})
      expect(isoScope.alerts.length > 0).toBe(true)
    })

    it('should create error alert with params', () => {
      const params = {
        message: 'RANDOM_MESSAGE',
        timeout: 2
      }
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProAlertScope>()
      _proTopAlertsService.error(params)
      const found = _.find(isoScope.alerts, (o: Params) => o.message === 'RANDOM_MESSAGE' && o.timeout === 2)
      expect(found !== undefined).toBe(true)
    })
    it('should create warning alert', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProAlertScope>()
      _proTopAlertsService.warning({})
      expect(isoScope.alerts.length > 0).toBe(true)
    })

    it('should create warning alert with params', () => {
      const params = {
        message: 'RANDOM_MESSAGE',
        timeout: 2
      }
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProAlertScope>()
      _proTopAlertsService.warning(params)
      const found = _.find(isoScope.alerts, (o: Params) => o.message === 'RANDOM_MESSAGE' && o.timeout === 2)
      expect(found !== undefined).toBe(true)
    })
    it('should create info alert', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProAlertScope>()
      _proTopAlertsService.info({})
      expect(isoScope.alerts.length > 0).toBe(true)
    })

    it('should create info alert with params and destroy it after timeout', () => {
      const params = {
        message: 'RANDOM_MESSAGE',
        timeout: 2
      }
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProAlertScope>()
      _proTopAlertsService.info(params)
      const found = _.find(isoScope.alerts, (o: Params) => o.message === 'RANDOM_MESSAGE' && o.timeout === 2)
      expect(found !== undefined).toBe(true)
      $timeout.flush()
      expect(isoScope.alerts.length === 0).toBe(true)
    })

    it('should create 3 alerts with params and show third after destroy by timeout first and second', () => {
      const params = {
        message: 'RANDOM_MESSAGE',
        timeout: 2
      }
      const lastParams = {
        message: 'RANDOM_MESSAGE'
      }
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProAlertScope>()
      _proTopAlertsService.info(params)
      _proTopAlertsService.error(params)
      _proTopAlertsService.info(lastParams)
      const found = _.find(isoScope.alerts, (o: Params) => o.message === 'RANDOM_MESSAGE' && o.timeout === 2)
      expect(found !== undefined).toBe(true)
      $timeout.flush()
      expect(isoScope.alerts.length === 1).toBe(true)
    })
  })
})
