function AccountsApiResolverFunction($q, SessionApi, AccountsApi) {
  var deferred = $q.defer()
  SessionApi.get().$promise.then((response) => {
    AccountsApi.query({telcoLogin: response.telcoLogin}).$promise.then((result) => {
      deferred.resolve(result)
    }, (error) => {
      deferred.reject(error)
    })
  }, (error) => {
    deferred.reject(error)
  })
  return deferred.promise
}


function ProfilesApiResolverFunction($q, ProfilesApi) {
  var deferred = $q.defer()
  ProfilesApi.get({profileId: '000000'}).$promise.then((profilesApiResponse) => {
    deferred.resolve(profilesApiResponse)
  }, (profilesApiError) => {
    deferred.reject(profilesApiError)
  })
  return deferred.promise
}


function ProfilesNewApiResolverFunction($q, ProfilesNewApi) {
  var deferred = $q.defer()
  ProfilesNewApi.get().$promise.then((profilesNewApiResponse) => {
    deferred.resolve(profilesNewApiResponse)
  }, (profilesNewApiError) => {
    deferred.reject(profilesNewApiError)
  })
  return deferred.promise
}


function createExpertProfileFirstTime(ProfilesApi) {
  var deferred = $q.defer()
  ProfilesApi.get({profileId: '000000'}).$promise.then((profilesApiResponse) => {
    deferred.resolve(profilesApiResponse)
  }, (profilesApiError) => {
    deferred.reject(profilesApiError)
  })
  return deferred.promise
}

function expertProfileController(ProfilesNewApiResolver) {
  var vm = this

  // vm.account        = {} // AccountsApiResolver
  vm.profilesNew    = ProfilesNewApiResolver
}

function config($stateProvider) {
  $stateProvider.state('app.expert-profile', {
    url: '/expert-profile',
    templateUrl:    'expert-profile/expert-profile.tpl.html',
    controller:     expertProfileController,
    controllerAs:   'vm',
    resolve: {
      // AccountsApiResolver:    AccountsApiResolverFunction,
      // ProfilesApiResolver:    ProfilesApiResolverFunction,
      ProfilesNewApiResolver: ProfilesNewApiResolverFunction
    }
  })
}

angular.module('profitelo.controller.expert-profile', [
  'ui.router',
  // 'profitelo.api.accounts',
  // 'profitelo.api.session',
  'profitelo.api.profiles',
  'profitelo.directives.pro-expert-profile'
])
.config(config)

