var app = angular.module('ppdpapp.v2', [
	'ngRoute', 'ngAnimate', 'ui.bootstrap', 'angularFileUpload',
	'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.rowEdit',
	'ppdpappDirectives', 'ppdpappFactories', 'ppdpappFilters',
    'account', 'assignments', 'newsclips', 'batches', 'users', 'files'
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
        //token: undefined,
		email: 'admin@temple.edu'
        //email: undefined
	});
	
	$animateProvider.classNameFilter(/animate/);
}]);

app.controller('appCtrl', ['$scope', '$location', 'authInfo', 'authFactory', function($scope, $location, authInfo, authFactory){
    $scope.goto = function(where) {
        $location.path(where);
    };
    $scope.isNavActive = function(where) {
        return $location.path() === where;
    };
    $scope.isNavAllowed = function(where) {
        var roleName = authInfo ? authInfo.user ? authInfo.user.role ? authInfo.user.role.name : null : null : null;
        if (!roleName) return false;
        else roleName = roleName.toLowerCase().trim();
        
        //console.log('role name was', roleName);
        if (roleName === "researcher") {
            return (where.indexOf("/assignments") === 0);
        } else if (roleName === "sr. researcher") {
            return (where.indexOf("/assignments") === 0) ||
                (where.indexOf("/documents") === 0);
        } else if (roleName === "admin") {
            // Admin
            return true;
        } else {
            // Unknown
            return false;
        }
    };
    $scope.loggedIn = function() {
        return !!(authInfo.user);
    };
    $scope.nameOfUser = function() {
        return authInfo.user ? (authInfo.user.firstName + ' ' + authInfo.user.lastName) : undefined;
    };
    $scope.logOut = function() {
        authFactory.forgetSession();
    };
	// Try to login from remembered session
    authFactory.loadRememberedSession();
}]);