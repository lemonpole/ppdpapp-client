var batches = angular.module('batchesControllers', ['batchesFactory', 'usersFactory']);

batches.controller('batchesCtrl', ['$scope', '$location', '$q', 'batchesAPI', 'tablesAPI', 'authInfo', function($scope, $location, $q, batchesAPI, tablesAPI, authInfo){
    // Represents the loading state
    $scope.loaded = false;
    $scope.requestFailed = false;
    
    $scope.gridOptions = {
        enableSorting: true,
        enableRowSelection: true,
        enableSelectAll: true,
        multiSelect: true,
        columnDefs: [
            { name: 'Created By', field: 'creator' },
            { name: 'Date Added', field: 'dateAdded' },
            { name: 'Date Due', field: 'dateDue' },
            { name: 'View', cellTemplate: 'app/batches/partials/cellTemplate_batches.html' }
        ]
    };
    
	$scope.reloadBatches = function(){
        $scope.loaded = false;
        $scope.requestFailed = false;
		batchesAPI.getAll(authInfo.token).success(function(res){
			$scope.gridOptions.data = res;
            $scope.loaded = true;
            $scope.requestFailed = false;
		}).error(function() {
            $scope.loaded = false;
            $scope.requestFailed = true;
        });
	};
	$scope.reloadBatches();
    
    $scope.gridScope = {
        load: function(batchObj){
            $location.path('/batches/' + batchObj.batchID);
        },
        viewUsers: function(batchObj){
            $location.path('/batches/' + batchObj.batchID + '/view/users');   
        },
        docsAction: function(batchObj, action){
            tablesAPI.find(authInfo.token, batchObj.tablesID).success(function(res){
            	$location.path('/batches/' + batchObj.batchID + '/' + action + '/' + res.TableName);
            });
        }
    };
    $scope.gridOptions.onRegisterApi = function(gridApi){ 
        $scope.gridApi = gridApi;
    };
    $scope.deleteSelected = function(){
        if ($scope.processing) return; 

        var selectedRows = $scope.gridApi.selection.getSelectedRows();
		var promises = [];
		$scope.processing = true;
        
        for(var i=0; i<selectedRows.length; i++){
            promises.push(batchesAPI.delete(authInfo.token, selectedRows[i].batchID));
        }
		
		$q.all(promises).then(function(){
			$scope.reloadBatches();
			$scope.processing = false;
		});
    };
}]);
batches.controller('batchViewUsersCtrl', ['$scope', '$location', '$routeParams', '$q', 'batchesAPI', 'usersAPI', 'authInfo', function($scope, $location, $routeParams, $q, batchesAPI,  usersAPI, authInfo){
    $scope.batchUsersGridApi = null;
    $scope.usersGridApi = null;
    $scope.loaded = false;
    $scope.requestFailed = false;
    
    var columnDefs = [
        { field: 'email' },
        { field: 'firstName' },
        { field: 'lastName' }
    ];
    $scope.gridBatchUsersOptions = {
        columnDefs: columnDefs,
        enableRowSelection: true,
        enableSelectAll: true,
        multiSelect: true
    };
    $scope.gridUsersOptions = {
        columnDefs: columnDefs,
        enableRowSelection: true,
        enableSelectAll: true,
        multiSelect: true
    };
	
    $scope.reloadBatchUsers = function(){
        $scope.loaded = false;
        $scope.requestFailed = false;
		batchesAPI.getUsers(authInfo.token, $routeParams.batch_id).success(function(res){
			$scope.gridBatchUsersOptions.data = res;
            $scope.loaded = true;
            $scope.requestFailed = false;
		}).error(function() {
            $scope.loaded = false;
            $scope.requestFailed = true;
        });
	};
	$scope.reloadUsers = function(){
        $scope.loaded = false;
        $scope.requestFailed = false;
		usersAPI.getAll(authInfo.token).success(function(res){
			$scope.gridUsersOptions.data = res;
            $scope.loaded = true;
            $scope.requestFailed = false;
		}).error(function() {
            $scope.loaded = false;
            $scope.requestFailed = true;
        });
	};
    $scope.reloadBatchUsers();
    $scope.reloadUsers();
    $scope.refresh = function() {
        $scope.reloadBatchUsers();
        $scope.reloadUsers();
    };
    
    $scope.gridBatchUsersOptions.onRegisterApi = function(gridApi){ 
        $scope.batchUsersGridApi = gridApi;
    };
    $scope.deleteSelected = function(){
        if ($scope.processing_del) return;
        
        var selectedRows = $scope.batchUsersGridApi.selection.getSelectedRows();
        var promises = [];
		$scope.processing_del = true;
		
        for(var i=0; i<selectedRows.length; i++){
            promises.push(batchesAPI.deleteUser(authInfo.token, $routeParams.batch_id, selectedRows[i]));
        }
		
		$q.all(promises).then(function(){
			$scope.processing_del = false;
			$scope.reloadBatchUsers();
		});
    };
    
    
    $scope.gridUsersOptions.onRegisterApi = function(gridApi){ 
        $scope.usersGridApi = gridApi;
    };
    $scope.addSelected = function(){
        if ($scope.processing_add) return;
        
        var selectedRows = $scope.usersGridApi.selection.getSelectedRows();
		var promises = [];
		$scope.processing_add = true;
        
        for(var i=0; i<selectedRows.length; i++){
            promises.push(batchesAPI.addUser(authInfo.token, $routeParams.batch_id, selectedRows[i]));
        }
		
		$q.all(promises).then(function(){
			$scope.processing_add = false;
			$scope.reloadBatchUsers();
		});
    };
}]);
batches.controller('batchCreateCtrl', ['$scope', '$location', 'tablesAPI', 'batchesAPI', 'authInfo', function($scope, $location, tablesAPI, batchesAPI, authInfo){
    // Represents the loading state
    $scope.loaded = false;
    $scope.requestFailed = false;
	
	$scope.dt = new Date();
    $scope.minDate = new Date();
    $scope.processing = false;
    $scope.batch_type_dd_status = false;
    $scope.batch_type = null;
    
    $scope.today = function(){
        $scope.dt = new Date();
    };
    $scope.clear = function(){
        $scope.dt = null;
    };
    
    // call tablesAPI to get table names.
    tablesAPI.getAll(authInfo.token).success(function(res){
        $scope.batch_type_dd_items = res;
		$scope.loaded = true;
		$scope.requestFailed = false;
    });
    $scope.setBatchType = function(tableObj){
        $scope.batch_type = tableObj;
    };
    
    $scope.create = function(){
        $scope.processing = true;
        
        var batchObj = {};
        batchObj.fileID = null;
        batchObj.name = $scope.name;
        batchObj.dateAdded = new Date();
        batchObj.creator = authInfo.email;
        batchObj.dateDue = $scope.dt;
        batchObj.tablesID = $scope.batch_type.ID;
        
        batchesAPI.create(authInfo.token, batchObj).success(function(res){
            $scope.processing = false;
            $location.path('/batches/');
        });
    };
}]);