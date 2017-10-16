import * as angular from 'angular'
import {InvitationsResolver} from './invitations.resolver'
import invitationsPageModule from './invitations'
import {IInvitationsStateParams} from './invitations'

describe('Unit testing: profitelo.controller.invitations', () => {
  describe('for invitations resolver >', () => {

    let InvitationsResolver: InvitationsResolver
    let mockState: ng.ui.IStateService

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      mockState = {
        go: (): void => {
        }
      }

      angular.mock.module(invitationsPageModule, ($provide: ng.auto.IProvideService): void => {
        $provide.value('$state', mockState)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        InvitationsResolver = $injector.get<InvitationsResolver>('invitationsResolver')
      })
    })

    it('should have resolve function', () => {
      expect(InvitationsResolver.resolve).toBeDefined()
    })

    it('should redirect to home page if token does not exist', () => {
      spyOn(mockState, 'go')
      InvitationsResolver.resolve(<IInvitationsStateParams>{})
      expect(mockState.go).toHaveBeenCalledWith('app.home')
    })

  })
})
