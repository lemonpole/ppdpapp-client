var acct = angular.module('assignments', ['assignmentsControllers']);

acct.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/assignments', {
		templateUrl	: 'app/assignments/assignments.html',
		controller	: 'assignmentsCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
	
	$routeProvider.when('/assignments/:batch_id/view/newsclips', {
		templateUrl			: 'app/documents/newsclips/newsclips_code.html',
		caseInsensitiveMatch: true,
		controller			: 'newsclipsCodeCtrl',
		resolve				: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
}]);