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
}]);