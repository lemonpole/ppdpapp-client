var factories = angular.module('ppdpappFactories', []);

factories.factory('authFactory', ['$q', '$location', 'authInfo', 'usersAPI',
    function ($q, $location, authInfo, usersAPI) {
        var dataFactory = {};

        dataFactory.rememberSession = function () {
            if (typeof (Storage) !== 'undefined') {
                // Back up the important information about the session
                localStorage.setItem('email', authInfo.email);
                localStorage.setItem('token', authInfo.token);
            } else {
                console.error('No support for localstorage');
            }
        };

        dataFactory.loadRememberedSession = function () {
            var deferred = $q.defer();
            if (typeof (Storage) !== 'undefined') {
                // Back up the important information about the session
                var email = localStorage.getItem('email');
                var token = localStorage.getItem('token');
                if (email && token && email !== 'undefined' && token !== 'undefined') {
                    //console.log('email and token', email, token);
                    authInfo.token = token;
                    authInfo.email = email;
                    usersAPI.findByEmail(authInfo.email, authInfo.token).success(function (res) {
                        authInfo.user = res;
                        $location.path('/assignments');
                       deferred.resolve();
                    }).error(function (error) {
                        alert('Could not login successfully. Please try again.');
                        $scope.error = error;
                        $location.path('/login');
                        deferred.reject();
                    });
                } else {
                    $location.path('/login');
                    deferred.reject();
                }
            } else {
                console.error('No support for localstorage');
                deferred.reject();
            }
            return deferred.promise;
        };
        
        dataFactory.forgetSession = function() {
            if (typeof (Storage) !== 'undefined') {
                // Back up the important information about the session
                localStorage.removeItem('email');
                localStorage.removeItem('token');
                authInfo.user = undefined;
                authInfo.email = undefined;
                authInfo.token = undefined;
                $location.path('/');
            } else {
                console.error('No support for localstorage');
            }
        };

        dataFactory.resolveIsLoggedIn = function () {
            var deferred = $q.defer();
            var authenticated = true;

            // enable the two lines below for debugging.
            //deferred.resolve();
            //return deferred.promise;

            // check if global token var is set.
            // check that token corresponds to current user or that it did not expire.
            // redirect to appropriate route.
            if (authInfo.token == undefined || authInfo.email == undefined) authenticated = false;

            if (!authenticated) {
                deferred.reject();
                $location.path('/login');
            } else deferred.resolve();

            return deferred.promise;
        };

        return dataFactory;
}]);
factories.factory('tablesAPI', ['$http', 'apiRoot',
    function ($http, apiRoot) {
        var dataFactory = {};
        var urlBase = apiRoot + '/tables';

        dataFactory.getAll = function (token) {
            return $http.get(urlBase + '?token=' + token);
        };
        dataFactory.getByName = function (token, name) {
            return $http.get(urlBase + '/name/' + name + '?token=' + token);
        };
        dataFactory.find = function (token, id) {
            return $http.get(urlBase + '/id/' + id + '?token=' + token);
        };

        return dataFactory;
}]);
factories.factory('codesAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/codes';
	
	dataFactory.getAll = function(token, table_name){
		return $http.get(urlBase + '/' + table_name + '?token=' + token);
	};
	dataFactory.search = function(token, table_name, query){
		return $http.get(urlBase + '/' + table_name + '/search/?query=' + query + '&token=' + token);
	};
    
	return dataFactory;
}]);
factories.factory('newspapersAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/Newspapers';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
    
	return dataFactory;
}]);