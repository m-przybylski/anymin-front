angular.module('profitelo.controller.expert-progress', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.expert-progress', {
    url: '/expert-progress',
    controllerAs: 'vm',
    controller: '',
    templateUrl: 'expert-progress/expert-progress.tpl.html'
  })
})
