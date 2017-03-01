namespace profitelo.dashboard.serviceProvider.consultationRange.individual {

  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IDialogService = profitelo.services.dialog.IDialogService
  import IServiceProviderService = profitelo.services.serviceProvider.IServiceProviderService
  import IServiceProviderImageService = profitelo.resolvers.serviceProviderImage.IServiceProviderImageService
  import ExpertProfile = profitelo.models.ExpertProfile
  import IProfileApi = profitelo.api.IProfileApi
  import GetProfileWithServices = profitelo.api.GetProfileWithServices
  import IServiceApi = profitelo.api.IServiceApi
  import Tag = profitelo.api.Tag
  import IUserService = profitelo.services.user.IUserService

  function IndividualConsultationController($log: ng.ILogService, $scope: ng.IScope, $state: ng.ui.IStateService,
                                            savedProfile: GetProfileWithServices, ServiceApi: IServiceApi,
                                            topAlertService: ITopAlertService,
                                            profileImage: string, dialogService: IDialogService,
                                            serviceProviderService: IServiceProviderService) {

    this.costModel = serviceProviderService.createDefaultModel(0)
    this.editModel = serviceProviderService.createDefaultModel(0)

    this.queue = serviceProviderService.createDefaultQueue(3, 1, 0)
    this.editQueue = serviceProviderService.createDefaultQueue(3, 4, 3)

    this.currency = [
      {id: 1, name: 'PLN'},
      {id: 2, name: 'USD'},
      {id: 3, name: 'EUR'}
    ]
    this.consultations = []
    this.profile = {}
    this.profileImage = profileImage

    if (savedProfile && savedProfile.expertDetails && !savedProfile.organizationDetails) {
      this.profile = savedProfile.expertDetails
      this.consultations = savedProfile.services
    } else if (savedProfile.organizationDetails) {
      $state.go('app.dashboard.service-provider.consultation-range.company')
    }

    let _postConsultationMethod = (callback: Function) => {
      ServiceApi.postServiceRoute({
        details: {
          name: this.costModel.name,
          tags: this.costModel.tags,
          price: {
            amount: parseInt(this.costModel.cost, 10),
            currency: this.costModel.currency
          }
        },
        invitations: []
      }).then((res) => {

        if (angular.isDefined(res) && typeof callback === 'function') {
          callback()
        }
      }, (err) => {
        $log.error(err)
        topAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }

    let _calculateProgressPercentage = () => {
      this.progressBarWidth = Math.ceil(this.queue.completedSteps / this.queue.amountOfSteps * 100)
    }
    _calculateProgressPercentage()
    $scope.$watch(() => {
      return this.queue.completedSteps
    }, _calculateProgressPercentage)

    this.backToFirstStep = () => {
      serviceProviderService.backToFirstStep(savedProfile.expertDetails, savedProfile.organizationDetails)
    }


    this.saveConsultationObject = () => {
      let _redirectCallBack = () => {
        $state.go('app.dashboard.service-provider.summary.individual')
      }
      if (this.queue.completedSteps === this.queue.amountOfSteps) {
        _postConsultationMethod(_redirectCallBack)
      } else {
        _redirectCallBack()
      }

    }

    this.isConsultationPresent = () => {
      return this.consultations.length > 0
    }

    this.editConsultation = (id: string, name: string, price: number, tags: Array<Tag>) => {
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
          ServiceApi.deleteServiceRoute(_id).then((_res) => {
            this.consultations.splice(_index, 1)
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

    this.addAnotherConsultation = () => {
      _postConsultationMethod($state.reload)
    }

    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.consultation-range.individual', [
    'profitelo.services.dialog',
    'ui.router',
    'ngLodash',
    'profitelo.services.service-provider',
    'profitelo.common.controller.accept-reject-dialog-controller',
    'profitelo.services.user',
    'profitelo.api.ServiceApi',
    'profitelo.services.top-alert',
    'profitelo.resolvers.service-provider-image',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.directives.service-provider.pro-service-provider-cost',
    'profitelo.directives.service-provider.pro-service-provider-who-provides',
    'profitelo.directives.service-provider.pro-service-provider-tags',
    'profitelo.directives.service-provider.pro-bottom-consultation-button',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.service-provider.pro-service-provider-profile'
  ])
    .config(function ($stateProvider: ng.ui.IStateProvider) {
      $stateProvider.state('app.dashboard.service-provider.consultation-range.individual', {

        url: '/individual',
        templateUrl: 'dashboard/service-provider/consultation-range/individual/individual-consultation.tpl.html',
        controller: 'IndividualConsultationController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: IProfileApi,
                         lodash: _.LoDashStatic, userService: IUserService, ServiceApi: IServiceApi, topAlertService: ITopAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer<GetProfileWithServices | null>()
            /* istanbul ignore next */
            userService.getUser().then((user) => {
              ProfileApi.getProfileWithServicesRoute(user.id).then((response) => {
                const profileWithServices: GetProfileWithServices = response
                ServiceApi.postServicesTagsRoute({
                  serviceIds: lodash.map(profileWithServices.services, service => service.id)
                }).then((servicesTags) => {


                  profileWithServices.services.forEach((service) => {
                    // FIXME remove any
                    (<any>service.details).tags = lodash.head(
                      lodash.filter(servicesTags, (serviceTags) => service.id === serviceTags.serviceId)).tags
                  })
                  _deferred.resolve(profileWithServices)
                })
              }, () => {
                _deferred.resolve(null)
              }, (error: any) => {
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
          profileImage: (ServiceProviderImageResolver: IServiceProviderImageService, savedProfile: ExpertProfile) => {
            return ServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar || '')
          }

        },
        data: {
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE',
          showMenu: false
        }
      })
    })
    .controller('IndividualConsultationController', IndividualConsultationController)
}

