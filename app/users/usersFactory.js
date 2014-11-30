var users = angular.module('usersFactory', []);

users.factory('usersAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/users/';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
	
	return dataFactory;
}]);