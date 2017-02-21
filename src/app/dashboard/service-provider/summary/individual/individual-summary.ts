namespace profitelo.dashboard.serviceProvider.summary.individual {

  import IFilterService = profitelo.services.filter.IFilterService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IDialogService = profitelo.services.dialog.IDialogService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  import IServiceProviderImageService = profitelo.resolvers.serviceProviderImage.IServiceProviderImageService
  import IProfileApi = profitelo.api.IProfileApi
  import GetProfileWithServices = profitelo.api.GetProfileWithServices
  import IServiceApi = profitelo.api.IServiceApi

  function IndividualSummaryController($log: ng.ILogService, $state: ng.ui.IStateService, $scope: ng.IScope,
                                       $filter: IFilterService, savedProfile: GetProfileWithServices,
                                       ServiceApi: IServiceApi,
                                       topAlertService: ITopAlertService, profileImage: string,
                                       dialogService: IDialogService, communicatorService: ICommunicatorService) {

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
      $state.go('app.dashboard.service-provider.consultation-range.individual')
    }

    this.profileImage = profileImage
    this.backToFirstStep = () => {
      if (savedProfile.expertDetails && !savedProfile.organizationDetails) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        $state.go('app.dashboard.service-provider.company-path')
      }
    }


    this.verifyProfile = ()=> {
      ServiceApi.postServicesVerifyRoute().then((_res)=> {
        $state.go('app.dashboard.client.favourites')
        communicatorService.authenticate()
        topAlertService.success({
          message: $filter('translate')('DASHBOARD.CREATE_PROFILE.SUMMARY_VERIFY'),
          timeout: 4
        })
      }, (err: any) => {
        $log.error(err)
        topAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }

    this.editConsultation = (id: string, name: string, price: number, tags: Array<any>) => {
      this.currentEditConsultationId = this.currentEditConsultationId === id ? -1 : id
      this.editQueue = {
        amountOfSteps: 3,
        currentStep: 4,
        completedSteps: 3,
        skippedSteps: {}
      }
      this.editModel = {
        name: name,
        tags: tags,
        cost: price
      }
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
          invitations: []
        }).then(() => {
          $state.reload()
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


  angular.module('profitelo.controller.dashboard.service-provider.summary.individual', [
    'ui.router',
    'profitelo.services.dialog',
    'profitelo.services.communicator',
    'profitelo.common.controller.accept-reject-dialog-controller',
    'profitelo.directives.service-provider.pro-service-provider-summary-step',
    'c7s.ng.userAuth',
    'profitelo.resolvers.service-provider-image',
    'profitelo.api.ServiceApi',
    'profitelo.directives.interface.pro-alert'
  ])
    .config(function($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
      $stateProvider.state('app.dashboard.service-provider.summary.individual', {
        url:          '/individual',
        templateUrl:  'dashboard/service-provider/summary/individual/individual-summary.tpl.html',
        controller:   'IndividualSummaryController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: IProfileApi,
                         lodash: _.LoDashStatic, User: any, ServiceApi: IServiceApi, topAlertService: ITopAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer<GetProfileWithServices | null>()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfileWithServicesRoute(User.getData('id')).then((profileWithServices) => {

                ServiceApi.postServicesTagsRoute({
                  serviceIds: lodash.map(profileWithServices.services, service => service.id)
                }).then((servicesTags) => {

                  profileWithServices.services.forEach((service) => {
                    (<any>service.details).tags = lodash.head(
                      lodash.filter(servicesTags, (serviceTags) => service.id === serviceTags.serviceId)).tags
                  })
                  _deferred.resolve(profileWithServices)
                })
              }, (err) => {
                _deferred.reject(err)
              }, (error)=> {
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
          profileImage: (ServiceProviderImageResolver: IServiceProviderImageService,
                         savedProfile: GetProfileWithServices, $q: ng.IQService) => {
            /* istanbul ignore next */
            if (savedProfile.expertDetails) {
              return ServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar || '')
            }
            else {
              return $q.resolve('')
            }
          }
        },
        data: {
          access : UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE',
          showMenu: false
        }
      })
    })
    .controller('IndividualSummaryController', IndividualSummaryController)

}
