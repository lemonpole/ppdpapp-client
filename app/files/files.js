var files = angular.module('files', ['filesControllers']);

files.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/files', {
		templateUrl	: 'app/files/files.html',
		controller	: 'filesCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
	
	$routeProvider.when('/files/create', {
		templateUrl	: 'app/files/file_create.html',
		controller	: 'fileCreateCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
}]);