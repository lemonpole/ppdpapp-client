var app = angular.module('ppdpapp.v2', [
	'ngRoute', 'ngAnimate', 'ui.bootstrap',
	'ppdpappFactories', 'account'
]);

app.config(['$routeProvider', '$provide', '$animateProvider', function($routeProvider, $provide, $animateProvider){
	var apiRootElem = angular.element(document.querySelector('#apiroot'));
	
	$routeProvider.otherwise({
		redirectTo: '/',
		templateUrl: 'app/app.html',
		controller: 'appCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.isLoggedIn();	
			}
		}
	});
	
	$provide.constant('apiRoot', apiRootElem.attr('href'));
	$provide.value('authInfo', {
		token: undefined,
		email: undefined
	});
	
	$animateProvider.classNameFilter(/animate/);
}]);

app.controller('appCtrl', ['$scope', function($scope){
	console.log('hello, world!');
}]);