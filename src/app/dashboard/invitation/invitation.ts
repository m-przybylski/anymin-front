namespace profitelo.dashboard.invitaion {

  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IServiceProviderImageService = profitelo.resolvers.serviceProviderImage.IServiceProviderImageService
  import IProfileApi = profitelo.api.IProfileApi
  import GetProfileWithServicesEmployments = profitelo.api.GetProfileWithServicesEmployments
  import IServiceApi = profitelo.api.IServiceApi

  function InvitationController(pendingInvitations: Array<GetProfileWithServicesEmployments>, companyLogo: string) {

    if (pendingInvitations.length > 0) {
      this.invitations = pendingInvitations
      this.invitations[0].organizationDetails.logoUrl = companyLogo
    }

    return this
  }

  function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
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
        pendingInvitations: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: IProfileApi,
                             User: any, ServiceApi: IServiceApi, lodash: _.LoDashStatic, topAlertService: ITopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer<Array<GetProfileWithServicesEmployments>>()
          /* istanbul ignore next */
          User.getStatus().then(() => {
            ProfileApi.getProfilesInvitationsRoute().then((profileInvitations) => {

              ServiceApi.postServicesTagsRoute({
                serviceIds: lodash.flatten(lodash.map(profileInvitations, (profile) => lodash.map(profile.services, service => service.id)))
              }).then((servicesTags) => {

                profileInvitations.forEach((profile) => {
                  profile.services.forEach((service) => {
                    //FIXME
                    (<any>service.details).tags = lodash.head(
                      lodash.filter(servicesTags, (serviceTags) => service.id === serviceTags.serviceId)).tags
                  })
                })

                _deferred.resolve(profileInvitations)
              })
            }, () => {
              _deferred.resolve([])
            })
          }, (error: any) => {
            $log.error(error)
            $state.go('app.dashboard')
            topAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        },
        companyLogo: (ServiceProviderImageResolver: IServiceProviderImageService,
                      pendingInvitations: Array<GetProfileWithServicesEmployments>, $q: ng.IQService) => {
          const firstInv = pendingInvitations[0]
          if (firstInv && firstInv.organizationDetails && firstInv.organizationDetails.logo ) {
            return ServiceProviderImageResolver.resolve(firstInv.organizationDetails.logo)
          } else {
            return $q.resolve('')
          }
        }
      }
    })
  }


  angular.module('profitelo.controller.dashboard.invitation', [
    'c7s.ng.userAuth',
    'ui.router',
    'ngLodash',
    'profitelo.components.invitations.company-profile',
    'profitelo.resolvers.service-provider-image',
    'profitelo.components.dashboard.invitation.pro-invitation-acceptance-box'

  ])
    .config(config)
    .controller('InvitationController', InvitationController)
}
