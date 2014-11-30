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
}]);