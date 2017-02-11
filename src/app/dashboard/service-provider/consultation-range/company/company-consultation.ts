namespace profitelo.dashboard.serviceProvider.consultationRange.company {

  import IDialogService = profitelo.services.dialog.IDialogService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IServiceProviderService = profitelo.services.serviceProvider.IServiceProviderService
  import IServiceProviderImageService = profitelo.resolvers.serviceProviderImage.IServiceProviderImageService
  import CompanyProfile = profitelo.models.CompanyProfile
  import Tag = profitelo.models.Tag
  import Profile = profitelo.models.Profile
  import Service = profitelo.models.Service

  function CompanyConsultationController($log: ng.ILogService, $scope: ng.IScope, $state: ng.ui.IStateService,
                                         dialogService: IDialogService, savedProfile: Profile, ServiceApi: any,
                                         topAlertService: ITopAlertService, profileImage: string,
                                         lodash: _.LoDashStatic, serviceProviderService: IServiceProviderService) {

    this.costModel = serviceProviderService.createDefaultModel(0)
    this.editModel = serviceProviderService.createDefaultModel(0)

    this.queue = serviceProviderService.createDefaultQueue(4, 1, 0)
    this.editQueue = serviceProviderService.createDefaultQueue(4, 5, 4)

    this.currency = [
      {id: 1, name: 'PLN'},
      {id: 2, name: 'USD'},
      {id: 3, name: 'EUR'}
    ]

    this.profile = savedProfile.organizationDetails
    this.consultations = savedProfile.services
    this.profileImage = profileImage

    let _postConsultationMethod = (callback: Function) => {
      ServiceApi.postService({
        details: {
          name: this.costModel.name,
          tags: this.costModel.tags,
          price: {
            amount: parseInt(this.costModel.cost, 10),
            currency: this.costModel.currency
          }
        },
        ownerEmployee: this.ownerEmployee,
        invitations: this.costModel.invitations
      }).$promise.then((_res: any)=> {

        if (typeof callback === 'function') {
          callback()
        }
      }, (err: any)=> {
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


    this.backToFirstStep = () =>  {
      serviceProviderService.backToFirstStep(savedProfile.expertDetails, savedProfile.organizationDetails)
    }


    this.saveConsultationObject = () => {
      let _redirectByOwnerEmployeeStatus = () => {
        if ((!!lodash.find(this.consultations, {'ownerEmployee': true}) || !!this.ownerEmployee) && !savedProfile.expertDetails ) {
          $state.go('app.dashboard.service-provider.individual-path')
        } else {
          $state.go('app.dashboard.service-provider.summary.company')
        }
      }

      if (this.queue.completedSteps === this.queue.amountOfSteps) {
        _postConsultationMethod(_redirectByOwnerEmployeeStatus)
      } else {
        _redirectByOwnerEmployeeStatus()
      }

    }

    this.isConsultationPresent = () => {
      return this.consultations.length > 0
    }

    this.editConsultation = (id: string, name: string, price: number, tags: Array<Tag>,
                             invitations: Array<CompanyProfile>, ownerEmployee: boolean) => {
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

        ServiceApi.putService({
          serviceId: id
        }, {
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
        }).$promise.then(() => {
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
          ServiceApi.deleteService({
            serviceId: _id
          }).$promise.then((_res: any)=> {
            this.consultations.splice(_index, 1)
          }, (err: any) => {
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

  angular.module('profitelo.controller.dashboard.service-provider.consultation-range.company', [
    'ui.bootstrap',
    'profitelo.services.service-provider',
    'profitelo.common.controller.accept-reject-dialog-controller',
    'ui.router',
    'ngLodash',
    'c7s.ng.userAuth',
    'profitelo.services.dialog',
    'profitelo.swaggerResources',
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
    .config(function($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
      $stateProvider.state('app.dashboard.service-provider.consultation-range.company', {

        url: '/company',
        templateUrl: 'dashboard/service-provider/consultation-range/company/company-consultation.tpl.html',
        controller: 'CompanyConsultationController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: any,
                         lodash: _.LoDashStatic, User: any, ServiceApi: any, topAlertService: ITopAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer<CompanyProfile | null>()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfileWithServices({
                profileId: User.getData('id')
              }).$promise.then((profileWithServices: CompanyProfile) => {
                ServiceApi.postServicesTags({
                  serviceIds: lodash.map(profileWithServices.services, 'id')
                }).$promise.then((servicesTags: Array<Service>) => {
                  profileWithServices.services.forEach((service: Service) => {
                    service.details.tags = lodash.head(
                      lodash.filter(servicesTags, (serviceTags: any) => service.id === serviceTags.serviceId)).tags
                  })
                  _deferred.resolve(profileWithServices)
                })
              }, () => {
                _deferred.resolve(null)
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
          /* istanbul ignore next */
          profileImage: (ServiceProviderImageResolver: IServiceProviderImageService, savedProfile: CompanyProfile) => {
            return ServiceProviderImageResolver.resolve(savedProfile.organizationDetails.logo || '')
          }
        },
        data: {
          access: UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE',
          showMenu: false
        }
      })
    })
    .controller('CompanyConsultationController', CompanyConsultationController)
}
