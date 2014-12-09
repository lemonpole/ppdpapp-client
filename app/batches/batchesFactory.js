var batches = angular.module('batchesFactory', []);

batches.factory('batchesAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/batches';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
	dataFactory.find = function(token, batch_id){
		return $http.get(urlBase + '/' + batch_id + '?token=' + token);
	};
    dataFactory.create = function(token, batchObj){
        return $http.post(urlBase + '?token=' + token, batchObj);
    };
	dataFactory.delete = function(token, id){
        return $http.delete(urlBase + '/' + id + '?token=' + token);
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
	dataFactory.getDocuments = function(token, id){
		return $http.get(urlBase + '/' + id + '/documents?token=' + token);
	};
	dataFactory.addDocument = function(token, batch_id, doc_id){
		return $http.post(urlBase + '/' + batch_id + '/add/document/' + doc_id + '?token=' + token);
	};
    dataFactory.deleteDocument = function(token, batch_id, doc_id){
		return $http.delete(urlBase + '/' + batch_id + '/delete/document/' + doc_id + '?token=' + token);
	};
	
	return dataFactory;
}]);