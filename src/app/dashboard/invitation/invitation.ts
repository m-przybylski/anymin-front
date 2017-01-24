(function() {

  function InvitationController(pendingInvitations, companyLogo) {

    if (pendingInvitations.length > 0) {
      this.invitations = pendingInvitations
      this.invitations[0].organizationDetails.logoUrl = companyLogo
    }

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
        pageTitle: 'PAGE_TITLE.INVITATIONS'
      },
      resolve: {
        pendingInvitations: ($q, $state, ProfileApi, User, ServiceApi, lodash: _.LoDashStatic, topAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          User.getStatus().then(() => {
            ProfileApi.getProfilesInvitations().$promise.then((profileInvitations) => {
              ServiceApi.postServicesTags({
                serviceIds: lodash.flatten(lodash.map(profileInvitations, (profile: any) => lodash.map(profile.services, 'id')))
              }).$promise.then((servicesTags) => {

                profileInvitations.forEach((profile) => {
                  profile.services.forEach((service) => {
                    service.details.tags = lodash.head(
                      lodash.filter(servicesTags, (serviceTags: any) => service.id === serviceTags.serviceId)).tags
                  })
                })

                _deferred.resolve(profileInvitations)
              })
            }, () => {
              _deferred.resolve([])
            })
          }, (error) => {
            $state.go('app.dashboard')
            topAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        },
        companyLogo: (ServiceProviderImageResolver, pendingInvitations) => {
          if (pendingInvitations.length > 0) {
            return ServiceProviderImageResolver.resolve(pendingInvitations[0].organizationDetails.logo)
          } else {
            return false
          }
        }
      }
    })
  }


  angular.module('profitelo.controller.dashboard.invitation', [
    'c7s.ng.userAuth',
    'ui.router',
    'ngLodash',
    'profitelo.swaggerResources',
    'profitelo.components.invitations.company-profile',
    'profitelo.resolvers.service-provider-image',
    'profitelo.components.dashboard.invitation.pro-invitation-acceptance-box'

  ])
    .config(config)
    .controller('InvitationController', InvitationController)

}())
