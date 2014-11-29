var acct = angular.module('assignmentsFactory', []);

acct.factory('assignmentsAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/batches/';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
    dataFactory.getDocuments = function(token, id){
        return $http.get(urlBase + '/' + id + '/documents?token=' + token);
    };
	
	return dataFactory;
}]);