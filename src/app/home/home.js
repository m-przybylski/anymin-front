(() => {

	var module = angular.module('profitelo.controller.home', [
		'ui.router'
	])

		.config(function($stateProvider) {
			$stateProvider.state('app.home', {
				url: '/home',
				controllerAs: 'vm',
				controller: 'HomeController',
				templateUrl: 'home/home.tpl.html'
			});
		});


	var HomeController = () => {
		var vm = this;

		console.log('WOWOWO');

		return vm;
	};

	module.controller('HomeController', HomeController);

})();