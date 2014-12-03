var batches = angular.module('batchesFactory', []);

batches.factory('batchesAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/batches';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
    dataFactory.create = function(token, batchObj){
        return $http.post(urlBase + '?token=' + token, batchObj);
    };
    dataFactory.getUsers = function(token, id){
        return $http.get(urlBase + '/' + id + '/users?token=' + token);
    };
	dataFactory.addUser = function(token, id, userObj){
        return $http.post(urlBase + '/' + id + '/add/user?token=' + token, userObj); 
    };
    dataFactory.deleteUser = function(token, id, userObj){
        return $http.delete(urlBase + '/' + id + '/delete/user/' + userObj.email + '?token=' + token); 
    };
    dataFactory.delete = function(token, id){
        return $http.delete(urlBase + '/' + id + '?token=' + token);
    }
    
	return dataFactory;
}]);