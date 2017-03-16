import * as angular from "angular"
import {ProfileApi, ServiceApi} from "profitelo-api-ng/api/api"
import {GetProfileWithServicesEmployments} from "profitelo-api-ng/model/models"
import {UserService} from "../../../common/services/user/user.service"
import {TopAlertService} from "../../../common/services/top-alert/top-alert.service"
import userModule from "../../../common/services/user/user"
import {IServiceProviderImageService} from "../../../common/resolvers/service-provider-image/service-provider-image.service"
import "common/components/invitations/company-profile"
import "common/components/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box"
import "common/resolvers/service-provider-image/service-provider-image.service"

function InvitationController(pendingInvitations: Array<GetProfileWithServicesEmployments>, companyLogo: string) {

  if (pendingInvitations.length > 0) {
    this.invitations = pendingInvitations
    this.invitations[0].organizationDetails.logoUrl = companyLogo
  }

  return this
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.dashboard.invitation', {
    url: '/invitations',
    controllerAs: 'vm',
    controller: 'InvitationController',
    template: require('./invitation.pug')(),
    data: {
      pageTitle: 'PAGE_TITLE.INVITATIONS'
    },
    resolve: {
      pendingInvitations: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: ProfileApi,
                           userService: UserService, ServiceApi: ServiceApi, lodash: _.LoDashStatic, topAlertService: TopAlertService) => {
        /* istanbul ignore next */
        let _deferred = $q.defer<Array<GetProfileWithServicesEmployments>>()
        /* istanbul ignore next */
        userService.getUser().then(() => {
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
        if (firstInv && firstInv.organizationDetails && firstInv.organizationDetails.logo) {
          return ServiceProviderImageResolver.resolve(firstInv.organizationDetails.logo)
        } else {
          return $q.resolve('')
        }
      }
    }
  })
}


angular.module('profitelo.controller.dashboard.invitation', [
  userModule,
  'ui.router',
  'ngLodash',
  'profitelo.components.invitations.company-profile',
  'profitelo.resolvers.service-provider-image',
  'profitelo.components.dashboard.invitation.pro-invitation-acceptance-box'
])
  .config(config)
  .controller('InvitationController', InvitationController)
