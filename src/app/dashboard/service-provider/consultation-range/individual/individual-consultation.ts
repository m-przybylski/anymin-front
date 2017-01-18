(function() {
  function IndividualConsultationController($scope, $state, User, savedProfile, ServiceApi, topAlertService,
                                            profileImage, lodash, dialogService, serviceProviderService) {

    this.costModel = serviceProviderService.createDefaultModel('')
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

    let _postConsultationMethod = (callback) => {
      ServiceApi.postService({
        details: {
          name: this.costModel.name,
          tags: this.costModel.tags,
          price: {
            amount: parseInt(this.costModel.cost, 10),
            currency: this.costModel.currency
          }
        },
        invitations: []
      }).$promise.then((res)=> {

        if (angular.isDefined(res) && typeof callback === 'function') {
          callback()
        }
      }, (err)=> {
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

    this.backToFirstStep = ()=> {
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

    this.editConsultation = (id, name, price, tags) => {
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
          invitations: []
        }).$promise.then(() => {
          $state.reload()
        })
      }
    }
    this.deleteConsultation = (id, index) => {

      ((serviceId, localIndex) => {
        let _id = serviceId
        let _index = localIndex

        this.modalCallback = () => {
          ServiceApi.deleteService({
            serviceId: _id
          }).$promise.then((res)=> {
            this.consultations.splice(_index, 1)
          }, (err) => {
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
    'c7s.ng.userAuth',
    'profitelo.swaggerResources',
    'profitelo.services.top-alert',
    'profitelo.services.resolvers.app.service-provider-image-resolver',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.directives.service-provider.pro-service-provider-cost',
    'profitelo.directives.service-provider.pro-service-provider-who-provides',
    'profitelo.directives.service-provider.pro-service-provider-tags',
    'profitelo.directives.service-provider.pro-bottom-consultation-button',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.service-provider.pro-service-provider-profile'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.service-provider.consultation-range.individual', {

        url:          '/individual',
        templateUrl:  'dashboard/service-provider/consultation-range/individual/individual-consultation.tpl.html',
        controller:   'IndividualConsultationController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($q, $state, ProfileApi, lodash, User, ServiceApi, topAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfileWithServices({
                profileId: User.getData('id')
              }).$promise.then((profileWithServices) => {
                ServiceApi.postServicesTags({
                  serviceIds: lodash.map(profileWithServices.services, 'id')
                }).$promise.then((servicesTags) => {

                  profileWithServices.services.forEach((service) => {
                    service.details.tags = lodash.head(
                      lodash.filter(servicesTags, (serviceTags: any) => service.id === serviceTags.serviceId)).tags
                  })
                  _deferred.resolve(profileWithServices)
                })
              }, () => {
                _deferred.resolve(null)
              }, (error)=> {
                _deferred.reject(error)
                $state.go('app.dashboard')
                topAlertService.error({
                  message: 'error',
                  timeout: 4
                })
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
          profileImage: (AppServiceProviderImageResolver, savedProfile) => {
            return AppServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar)
          }

        },
        data: {
          access : UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE',
          showMenu: false
        }
      })
    })
    .controller('IndividualConsultationController', IndividualConsultationController)

}())