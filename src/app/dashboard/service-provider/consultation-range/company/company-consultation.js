(function() {
  function CompanyConsultationController($scope, $state, savedProfile, ServiceApi, proTopAlertService) {

    let _createDefaultModel = (cost)=> {
      return  {
        name: '',
        tags: [],
        cost: cost,
        invitations: []
      }
    }

    let _createDefaultQueue = (amountOfSteps, currentStep, completedSteps)=> {
      return {
        amountOfSteps: amountOfSteps,
        currentStep: currentStep,
        completedSteps: completedSteps,
        skippedSteps: {}
      }
    }

    this.costModel = _createDefaultModel('')
    this.editModel = _createDefaultModel(0)

    this.queue = _createDefaultQueue(4, 1, 0)
    this.editQueue = _createDefaultQueue(4, 5, 4)

    this.currency = [
      {id: 1, name: 'PLN'},
      {id: 2, name: 'USD'},
      {id: 3, name: 'EUR'}
    ]

    this.profile = savedProfile.organizationDetails
    this.consultations = savedProfile.services

    let _postConsultationMethod = (callback) => {
      ServiceApi.postService({
        details: {
          name: this.costModel.name,
          tags: this.costModel.tags,
          price: parseInt(this.costModel.cost, 10)
        },
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

    this.backToFirstStep = () => {
      if (savedProfile.expertDetails && !savedProfile.organizationDetails) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        $state.go('app.dashboard.service-provider.company-path')
      }
    }


    this.saveConsultationObject = () => {
      if (this.queue.completedSteps === this.queue.amountOfSteps) {
        _postConsultationMethod()
      }
      $state.go('app.dashboard.service-provider.summary')
    }

    this.isConsultationPresent = () => {
      return this.consultations.length > 0
    }

    this.editConsultation = (id, name, price, tags, invitations) => {
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
      this.updateConsultation = () => {
        ServiceApi.putService({
          serviceId: id
        }, {
          details: {
            name: this.editModel.name,
            tags: this.editModel.tags,
            price: parseInt(this.editModel.cost, 10)
          },
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
      ServiceApi.deleteService({
        serviceId: id
      }).$promise.then((res)=> {
        this.consultations.splice(index, 1)
      }, (err) => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }

    this.addAnotherConsultation = () => {
      _postConsultationMethod($state.reload)
    }

    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.consultation-range.company', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.directives.service-provider.pro-service-provider-cost',
    'profitelo.directives.service-provider.pro-service-provider-who-provides',
    'profitelo.swaggerResources',
    'profitelo.directives.service-provider.pro-service-provider-tags',
    'profitelo.directives.service-provider.pro-bottom-consultation-button',
    'c7s.ng.userAuth',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.service-provider.pro-service-provider-profile'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.service-provider.consultation-range.company', {

        url:          '/company',
        templateUrl:  'dashboard/service-provider/consultation-range/company/company-consultation.tpl.html',
        controller:   'CompanyConsultationController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($q, $state, ProfileApi, User) => {
            let _deferred = $q.defer()
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


            return _deferred.promise
          }
        },
        data: {
          access : UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE'
        }
      })
    })
    .controller('CompanyConsultationController', CompanyConsultationController)

}())