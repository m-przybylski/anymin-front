(function() {


  function InvitationController(invitations) {

    this.invitations = invitations
    
    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.invitation', {
      url: '/invitations',
      controllerAs: 'vm',
      controller: 'InvitationController',
      templateUrl: 'dashboard/invitation/invitation.tpl.html',
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.LOGIN.ACCOUNT'
      },
      resolve: {
        invitations: ($q, $state, ProfileApi, User) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          User.getStatus().then(() => {
            ProfileApi.getProfilesInvitations().$promise.then((response) => {
              _deferred.resolve(response[0])
            }, () => {
              _deferred.resolve(null)
            })
          }, (error) => {
            $state.go('app.dashboard')
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        }
      }
    })
  }


  angular.module('profitelo.controller.dashboard.invitation', [
    'c7s.ng.userAuth',
    'ui.router',
    'profitelo.swaggerResources',

    'profitelo.directives.dashboard.invitation.pro-invitation-acceptance-box'

  ])
    .config(config)
    .controller('InvitationController', InvitationController)

}())
