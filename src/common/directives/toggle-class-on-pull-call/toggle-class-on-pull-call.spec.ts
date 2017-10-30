import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import toggleClassOnPullCall from './toggle-class-on-pull-call'
import {ExpertCallService} from '../../components/communicator/call-services/expert-call.service'
import {CurrentExpertCall} from '../../components/communicator/models/current-expert-call'
import {CallActiveDevice} from 'ratel-sdk-js/dist/protocol/events'

describe('Unit testing: profitelo.directives.toggle-class-on-pull-call', () => {
  return describe('for toggle-class-on-pull-call directive >', () => {

    let compile: ng.ICompileService
    let scope: ng.IScope
    const validHTML = '<div toggle-class-on-pull-call="is-active"></div>'

    const expertCallService: any = {
      onCallPull: (_cb: (currentExpertCall: CurrentExpertCall) => void): void => {},
      onCallTaken: (_cb: (activeDevice: CallActiveDevice) => void): void => {},
    } as ExpertCallService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('expertCallService', expertCallService)
    }))

    beforeEach(() => {
      angular.mock.module(toggleClassOnPullCall)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(): JQuery {
      const elem = angular.element(validHTML)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create()
      expect(el.html()).toBeDefined(true)
    })
  })
})
