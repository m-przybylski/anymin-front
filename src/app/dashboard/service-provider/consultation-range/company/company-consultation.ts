(function() {
  function CompanyConsultationController($scope, $state, DialogService, savedProfile, ServiceApi, proTopAlertService, profileImage, serviceProviderService) {

    this.costModel = serviceProviderService.createDefaultModel('')
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
        ownerEmployee: this.ownerEmployee,
        invitations: this.costModel.invitations
      }).$promise.then((res)=> {

        if (typeof callback === 'function') {
          callback()
        }
      }, (err)=> {
        proTopAlertService.error({
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
        if ((!!_.find(this.consultations, {'ownerEmployee': true}) || !!this.ownerEmployee) && !savedProfile.expertDetails ) {
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

    this.editConsultation = (id, name, price, tags, invitations, ownerEmployee) => {
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
        }, (err) => {
          proTopAlertService.error({
            message: 'error',
            timeout: 4
          })
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
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
        }
      })(id, index)

      DialogService.openDialog({
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
    'profitelo.services.service-provider-service',
    'profitelo.common.controller.accept-reject-dialog-controller',
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.services.dialog-service',
    'profitelo.swaggerResources',
    'profitelo.services.pro-top-alert-service',
    'profitelo.services.resolvers.app.service-provider-image-resolver',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.directives.service-provider.pro-service-provider-cost',
    'profitelo.directives.service-provider.pro-service-provider-who-provides',
    'profitelo.directives.service-provider.pro-service-provider-tags',
    'profitelo.directives.service-provider.pro-bottom-consultation-button',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.service-provider.pro-service-provider-profile'
  ])
    .config(function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.service-provider.consultation-range.company', {

        url: '/company',
        templateUrl: 'dashboard/service-provider/consultation-range/company/company-consultation.tpl.html',
        controller: 'CompanyConsultationController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($q, $state, ProfileApi, User, AppServiceProviderImageResolver, ServiceApi, proTopAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfileWithServices({
                profileId: User.getData('id')
              }).$promise.then((profileWithServices) => {
                ServiceApi.postServicesTags({
                  serviceIds: _.map(profileWithServices.services, 'id')
                }).$promise.then((servicesTags) => {
                  profileWithServices.services.forEach((service) => {
                    service.details.tags = _.head(
                      _.filter(servicesTags, (serviceTags: any) => service.id === serviceTags.serviceId)).tags
                  })
                  _deferred.resolve(profileWithServices)
                })
              }, () => {
                _deferred.resolve(null)
              }, (error)=> {
                _deferred.reject(error)
                $state.go('app.dashboard')
                proTopAlertService.error({
                  message: 'error',
                  timeout: 4
                })
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
          },
          /* istanbul ignore next */
          profileImage: (AppServiceProviderImageResolver, savedProfile) => {
            return AppServiceProviderImageResolver.resolve(savedProfile.organizationDetails.logo)
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

}())