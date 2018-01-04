import * as angular from 'angular'
import {IGroupedMessagesComponentBindings} from './grouped-messages'
import groupedMessagesModule from './grouped-messages';
import {GroupedMessagesComponentController} from './grouped-messages.controller';
import {CommunicatorService} from '../../../communicator.service'

describe('Unit testing: profitelo.components.communicator.messenger.maximized.grouped-messages', () => {
  return describe('for groupedMessages component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: GroupedMessagesComponentController

    const validHTML =
      '<grouped-messages messages="messages" participant-avatar="participantAvatar"></grouped-messages>'

    const bindings: IGroupedMessagesComponentBindings = {
      messages: [],
      participantAvatar: 'asd'
    }

    const communicatorService: CommunicatorService = <CommunicatorService>{
      getClientSession: () => {}
    }

    function create(html: string, bindings: IGroupedMessagesComponentBindings): JQuery {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module( ($provide: ng.auto.IProvideService): void => {
      $provide.value('communicatorService', communicatorService)
    }))

    beforeEach(() => {
      angular.mock.module(groupedMessagesModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          communicatorService: communicatorService
        }

        component = $componentController<GroupedMessagesComponentController, IGroupedMessagesComponentBindings>(
          'groupedMessages', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

  })
})
