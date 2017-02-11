namespace profitelo.dashboard.serviceProvider.summary.company {

  import IFilterService = profitelo.services.filter.IFilterService
  import CompanyProfile = profitelo.models.CompanyProfile
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IDialogService = profitelo.services.dialog.IDialogService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  import Service = profitelo.models.Service
  import IServiceProviderImageService = profitelo.resolvers.serviceProviderImage.IServiceProviderImageService

  function CompanySummaryController($log: ng.ILogService, $state: ng.ui.IStateService, $scope: ng.IScope,
                                    $filter: IFilterService, savedProfile: CompanyProfile, ServiceApi: any,
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
        ServiceApi.postServicesVerify().$promise.then((_res: any)=> {
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
            if (this.consultations.length === 0) {
              $state.go('app.dashboard.service-provider.consultation-range.company')
            }
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
    'profitelo.swaggerResources',
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
          savedProfile: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: any,
                         lodash: _.LoDashStatic, User: any, ServiceApi: any, topAlertService: ITopAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer<CompanyProfile | null>()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfileWithServices({
                profileId: User.getData('id')
              }).$promise.then((profileWithServices: CompanyProfile)=> {
                ServiceApi.postServicesTags({
                  serviceIds: lodash.map(profileWithServices.services, 'id')
                }).$promise.then((servicesTags: Array<Service>) => {

                  profileWithServices.services.forEach((service) => {
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
          companyLogo: (ServiceProviderImageResolver: IServiceProviderImageService, savedProfile: CompanyProfile) => {
            /* istanbul ignore next */
            return ServiceProviderImageResolver.resolve(savedProfile.organizationDetails.logo || '')
          },
          profileAvatar: (ServiceProviderImageResolver: IServiceProviderImageService, savedProfile: CompanyProfile) => {
            /* istanbul ignore next */
            if (angular.isObject(savedProfile.expertDetails)) {
              return ServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar || '')
            }
            return ''
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
