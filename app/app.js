var app = angular.module('ppdpapp.v2', [
	'ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.grid',
	'ppdpappFactories', 'account', 'assignments'
]);

app.config(['$routeProvider', '$provide', '$animateProvider', function($routeProvider, $provide, $animateProvider){
	var apiRootElem = angular.element(document.querySelector('#apiroot'));
	
	$routeProvider.otherwise({
		redirectTo: '/',
		templateUrl: 'app/app.html',
		controller: 'appCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
	
	$provide.constant('apiRoot', apiRootElem.attr('href'));
	$provide.value('authInfo', {
		token: 'k0nXf9nsC8ndoMrjgNZwDb8Lq42rHfET:1417047552017', // set back to undefined once done debugging...
		email: 'admin@temple.edu'
	});
	
	$animateProvider.classNameFilter(/animate/);
}]);

app.controller('appCtrl', ['$scope', function($scope){
	// do work
}]);