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
}]);