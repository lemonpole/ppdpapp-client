var users = angular.module('usersFactory', []);

users.factory('usersAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/users/';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
    dataFactory.findByEmail = function(email, token){
		return $http.get(urlBase + email + '?token=' + token);
	};
	dataFactory.getAllRoles = function(token){
		return $http.get(apiRoot + '/roles?token=' + token);	
	};
	dataFactory.create = function(token, userObj){
		return $http.post(urlBase + '?token=' + token, userObj);
	};
	
	return dataFactory;
}]);