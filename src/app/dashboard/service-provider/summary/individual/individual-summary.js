(function() {
  function IndividualSummaryController($state, $scope, $filter, savedProfile, ServiceApi, proTopAlertService, profileImage, DialogService) {

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
      ServiceApi.postServicesVerify().$promise.then((res)=> {
        $state.go('app.dashboard.start')
        proTopAlertService.success({
          message: $filter('translate')('DASHBOARD.CREATE_PROFILE.SUMMARY_VERIFY'),
          timeout: 4
        })
      }, (err) => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
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
            price: parseInt(this.editModel.cost, 10)
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
            if (this.consultations.length === 0) {
              $state.go('app.dashboard.service-provider.consultation-range.company')
            }
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

    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.summary.individual', [
    'ui.router',
    'profitelo.services.dialog-service',
    'profitelo.common.controller.accept-reject-dialog-controller',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-service-provider-summary-head',
    'profitelo.directives.service-provider.pro-service-provider-summary-step',
    'c7s.ng.userAuth',
    'profitelo.services.resolvers.app.service-provider-image-resolver',
    'profitelo.swaggerResources',
    'profitelo.directives.interface.pro-alert'
  ])
    .config(function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.service-provider.summary.individual', {
        url:          '/individual',
        templateUrl:  'dashboard/service-provider/summary/individual/individual-summary.tpl.html',
        controller:   'IndividualSummaryController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($q, $state, ProfileApi, User) => {
            /* istanbul ignore next */
            let _deferred = $q.defer()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfileWithServices({
                profileId: User.getData('id')
              }).$promise.then((response)=>{
                _deferred.resolve(response)
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
          profileImage: (AppServiceProviderImageResolver, savedProfile) => {
            /* istanbul ignore next */
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
    .controller('IndividualSummaryController', IndividualSummaryController)

}())
