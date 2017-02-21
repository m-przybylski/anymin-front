namespace profitelo.dashboard.serviceProvider.summary.company {

  import IFilterService = profitelo.services.filter.IFilterService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IDialogService = profitelo.services.dialog.IDialogService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  import IServiceProviderImageService = profitelo.resolvers.serviceProviderImage.IServiceProviderImageService
  import IProfileApi = profitelo.api.IProfileApi
  import GetProfileWithServices = profitelo.api.GetProfileWithServices
  import IServiceApi = profitelo.api.IServiceApi

  function CompanySummaryController($log: ng.ILogService, $state: ng.ui.IStateService, $scope: ng.IScope,
                                    $filter: IFilterService, savedProfile: GetProfileWithServices, ServiceApi: IServiceApi,
                                    topAlertService: ITopAlertService, profileAvatar: string, lodash: _.LoDashStatic,
                                    companyLogo: string, dialogService: IDialogService,
                                    communicatorService: ICommunicatorService) {

    if (savedProfile && savedProfile.expertDetails && !savedProfile.organizationDetails) {
      this.profile = savedProfile.expertDetails
      this.consultations = savedProfile.services
    } else {
      this.profile = savedProfile.organizationDetails
      this.consultations = savedProfile.services
      if (savedProfile.expertDetails) {
        this.expertProfile = savedProfile.expertDetails
      }
    }

    if (angular.isDefined(savedProfile.services) && savedProfile.services.length < 1) {
      $state.go('app.dashboard.service-provider.consultation-range.company')
    }

    this.companyLogo = companyLogo
    this.profileAvatar = profileAvatar

    this.backToFirstStep = () => {
      $state.go('app.dashboard.service-provider.company-path')
    }

    this.goToExpertEdit = () => {
      $state.go('app.dashboard.service-provider.individual-path')
    }

    this.verifyProfile = ()=> {
      if (!!lodash.find(this.consultations, {'ownerEmployee': true}) && !savedProfile.expertDetails ) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        ServiceApi.postServicesVerifyRoute().then((_res)=> {
          $state.go('app.dashboard.client.favourites')
          communicatorService.authenticate()
          topAlertService.success({
            message: $filter('translate')('DASHBOARD.CREATE_PROFILE.SUMMARY_VERIFY'),
            timeout: 4
          })
        }, (err) => {
          $log.error(err)
          topAlertService.error({
            message: 'error',
            timeout: 4
          })
        })
      }
    }

    this.editConsultation = (id: string, name: string, price: number, tags: Array<any>, invitations: Array<any>,
                             ownerEmployee: boolean) => {
      this.currentEditConsultationId = this.currentEditConsultationId === id ? -1 : id
      this.editQueue = {
        amountOfSteps: 4,
        currentStep: 5,
        completedSteps: 4,
        skippedSteps: {}
      }
      this.editModel = {
        name: name,
        tags: tags,
        cost: price,
        invitations: invitations
      }
      this.ownerEmployee = ownerEmployee
      this.updateConsultation = () => {

        ServiceApi.putServiceRoute(id, {
          details: {
            name: this.editModel.name,
            tags: this.editModel.tags,
            price: {
              amount: parseInt(this.editModel.cost, 10),
              currency: this.editModel.currency
            }
          },
          ownerEmployee: this.ownerEmployee,
          invitations: this.editModel.invitations
        }).then(() => {
          $state.reload()
        }, (err: any) => {
          $log.error(err)
          topAlertService.error({
            message: 'error',
            timeout: 4
          })
        })
      }
    }

    this.deleteConsultation = (id: string, index: number) => {

      ((serviceId, localIndex) => {
        let _id = serviceId
        let _index = localIndex

        this.modalCallback = () => {
          ServiceApi.deleteServiceRoute(_id).then((_res)=> {
            this.consultations.splice(_index, 1)
            if (this.consultations.length === 0) {
              $state.go('app.dashboard.service-provider.consultation-range.company')
            }
          }, (err) => {
            $log.error(err)
            topAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
        }
      })(id, index)

      dialogService.openDialog({
        scope: $scope,
        controller: 'acceptRejectDialogController',
        templateUrl: 'controllers/accept-reject-dialog-controller/accept-reject-dialog-controller.tpl.html'
      })

    }

    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.summary.company', [
    'ui.router',
    'profitelo.services.dialog',
    'profitelo.services.communicator',
    'profitelo.common.controller.accept-reject-dialog-controller',
    'profitelo.directives.service-provider.pro-service-provider-summary-step',
    'c7s.ng.userAuth',
    'profitelo.resolvers.service-provider-image',
    'profitelo.api.ServiceApi',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.service-provider.pro-service-provider-profile'
  ])
    .config(function($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
      $stateProvider.state('app.dashboard.service-provider.summary.company', {
        url: '/company',
        templateUrl: 'dashboard/service-provider/summary/company/company-summary.tpl.html',
        controller: 'CompanySummaryController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: IProfileApi,
                         lodash: _.LoDashStatic, User: any, ServiceApi: IServiceApi, topAlertService: ITopAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer<GetProfileWithServices>()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfileWithServicesRoute(
                User.getData('id')).then((profileWithServices)=> {

                ServiceApi.postServicesTagsRoute({
                  serviceIds: lodash.map(profileWithServices.services, service => service.id)
                }).then((servicesTags) => {

                  profileWithServices.services.forEach((service) => {
                    (<any>service.details).tags = lodash.head(
                      lodash.filter(servicesTags, (serviceTags: any) => service.id === serviceTags.serviceId)).tags
                  })
                  _deferred.resolve(profileWithServices)
                })
              }, (err) => {
                _deferred.reject(err)
              }, (error: any)=> {
                _deferred.reject(error)
                $state.go('app.dashboard')
                topAlertService.error({
                  message: 'error',
                  timeout: 4
                })
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
                        savedProfile: GetProfileWithServices, $q: ng.IQService) => {
            /* istanbul ignore next */
            if (savedProfile.organizationDetails && savedProfile.organizationDetails.logo) {
              return ServiceProviderImageResolver.resolve(savedProfile.organizationDetails.logo)
            }
            else {
              return $q.resolve('')
            }
          },
          profileAvatar: (ServiceProviderImageResolver: IServiceProviderImageService,
                          savedProfile: GetProfileWithServices, $q: ng.IQService) => {
            /* istanbul ignore next */
            if (angular.isObject(savedProfile.expertDetails) && savedProfile.expertDetails.avatar) {
              return ServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar)
            }
            return $q.resolve('')
          }
        },
        data: {
          access : UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE',
          showMenu: false
        }
      })
    })
    .controller('CompanySummaryController', CompanySummaryController)

}
