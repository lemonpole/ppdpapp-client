var users = angular.module('users', ['usersControllers']);

users.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/users', {
		templateUrl	: 'app/users/users.html',
		controller	: 'usersCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
	
	$routeProvider.when('/users/create', {
		templateUrl	: 'app/users/user_create.html',
		controller	: 'userCreateCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
}]);