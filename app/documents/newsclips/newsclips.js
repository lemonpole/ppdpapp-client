var nclips = angular.module('newsclips', ['newsclipsControllers']);

nclips.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/documents/newsclips', {
		templateUrl	: 'app/documents/newsclips/newsclips.html',
		controller	: 'newsclipsCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
	
	$routeProvider.when('/documents/newsclips/create', {
		templateUrl	: 'app/documents/newsclips/newsclips_create.html',
		controller	: 'newsclipsCreateCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
	
	$routeProvider.when('/documents/newsclips/view/:doc_id', {
		templateUrl	: 'app/documents/newsclips/newsclips_create.html',
		controller	: 'newsclipsViewCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
}]);