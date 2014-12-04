var batches = angular.module('batchesControllers', ['batchesFactory', 'usersFactory']);

batches.controller('batchesCtrl', ['$scope', '$location', 'batchesAPI', 'tablesAPI', 'authInfo', function($scope, $location, batchesAPI, tablesAPI, authInfo){
    $scope.processing = false;
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
    
    batchesAPI.getAll(authInfo.token).success(function(res){
        $scope.gridOptions.data = res;
    });
    
    $scope.gridScope = {
        load: function(batchObj){
            $location.path('/batches/' + batchObj.batchID);
        },
        viewUsers: function(batchObj){
            $location.path('/batches/' + batchObj.batchID + '/view/users');   
        },
        addDocs: function(batchObj){
            tablesAPI.find(authInfo.token, batchObj.tablesID).success(function(res){
            	$location.path('/batches/' + batchObj.batchID + '/add/' + res.TableName);
            });
        }
    };
    $scope.gridOptions.onRegisterApi = function(gridApi){ 
        $scope.gridApi = gridApi;
    };
    $scope.deleteSelected = function(){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        
        for(var i=0; i<selectedRows.length; i++){
            batchesAPI.delete(authInfo.token, selectedRows[i].batchID).success(function(res){});
        }
    };
}]);
batches.controller('batchViewUsersCtrl', ['$scope', '$location', '$routeParams', 'batchesAPI', 'usersAPI', 'authInfo', function($scope, $location, $routeParams, batchesAPI,  usersAPI, authInfo){
    $scope.processing_add = false;
    $scope.batchUsersGridApi = null;
    $scope.usersGridApi = null;
    
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
    
    batchesAPI.getUsers(authInfo.token, $routeParams.batch_id).success(function(res){
       $scope.gridBatchUsersOptions.data = res; 
    });
    usersAPI.getAll(authInfo.token).success(function(res){
        $scope.gridUsersOptions.data = res;
    });
    
    $scope.gridBatchUsersOptions.onRegisterApi = function(gridApi){ 
        $scope.batchUsersGridApi = gridApi;
    };
    $scope.deleteSelected = function(){
        var selectedRows = $scope.batchUsersGridApi.selection.getSelectedRows();
        
         for(var i=0; i<selectedRows.length; i++){
            // call api. on success continue. on fail, do nothing.
            batchesAPI.deleteUser(authInfo.token, $routeParams.batch_id, selectedRows[i]).success(function(res){
                // do work.
            });
        }
    };
    
    
    $scope.gridUsersOptions.onRegisterApi = function(gridApi){ 
        $scope.usersGridApi = gridApi;
    };
    $scope.addSelected = function(){
        //$scope.processing_add = true;
        var selectedRows = $scope.usersGridApi.selection.getSelectedRows();
        
        for(var i=0; i<selectedRows.length; i++){
            // call api. on success continue. on fail, do nothing.
            batchesAPI.addUser(authInfo.token, $routeParams.batch_id, selectedRows[i]).success(function(res){
                // do work.
            });
        }
    };
}]);
batches.controller('batchCreateCtrl', ['$scope', '$location', 'tablesAPI', 'batchesAPI', 'authInfo', function($scope, $location, tablesAPI, batchesAPI, authInfo){
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