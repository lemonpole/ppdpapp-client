var nclip = angular.module('newsclipsFactory', []);

nclip.factory('newsclipsAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/documents/Newsclips';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
	
	return dataFactory;
}]);