(function() {
  function CompanySummaryController($log, $state, $scope, $filter, savedProfile, ServiceApi, topAlertService,
                                    profileAvatar, lodash: _.LoDashStatic, companyLogo, dialogService, communicatorService) {

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
        ServiceApi.postServicesVerify().$promise.then((_res)=> {
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
          $log.error(err)
          topAlertService.error({
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
          }).$promise.then((_res)=> {
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
    'profitelo.swaggerResources',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.service-provider.pro-service-provider-profile'
  ])
    .config(function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.service-provider.summary.company', {
        url: '/company',
        templateUrl: 'dashboard/service-provider/summary/company/company-summary.tpl.html',
        controller: 'CompanySummaryController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($log, $q, $state, ProfileApi, lodash: _.LoDashStatic, User, ServiceApi, topAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfileWithServices({
                profileId: User.getData('id')
              }).$promise.then((profileWithServices)=> {
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
          companyLogo: (ServiceProviderImageResolver, savedProfile) => {
            /* istanbul ignore next */
            return ServiceProviderImageResolver.resolve(savedProfile.organizationDetails.logo)
          },
          profileAvatar: (ServiceProviderImageResolver, savedProfile) => {
            /* istanbul ignore next */
            if (angular.isObject(savedProfile.expertDetails)) {
              return ServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar)
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

}())
