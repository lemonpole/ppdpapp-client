var batches = angular.module('batchesControllers', ['batchesFactory', 'usersFactory']);

batches.controller('batchesCtrl', ['$scope', '$location', 'batchesAPI', 'authInfo', function($scope, $location, batchesAPI, authInfo){
    $scope.gridOptions = {
        enableSorting: true,
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
        }
    };
}]);

batches.controller('batchViewUsersCtrl', ['$scope', '$location', '$routeParams', 'batchesAPI', 'usersAPI', 'authInfo', function($scope, $location, $routeParams, batchesAPI,  usersAPI, authInfo){
    $scope.processing_add = false;
    
    var columnDefs = [
        { field: 'email' },
        { field: 'firstName' },
        { field: 'lastName' }
    ];
    $scope.gridBatchUsersOptions = {
        columnDefs: columnDefs
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
    
    $scope.gridUsersOptions.onRegisterApi = function(gridApi){ 
        $scope.gridApi = gridApi;
    };
    $scope.addSelected = function(){
        //$scope.processing_add = true;
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        
        for(var i=0; i<selectedRows.length; i++){
            // call api. on success continue. on fail, do nothing.
            batchesAPI.addUser(authInfo.token, $routeParams.batch_id, selectedRows[i]).success(function(res){
                // do work.
            });
        }
    };
}]);

batches.controller('batchCreateCtrl', ['$scope', '$location', 'batchesAPI', 'authInfo', function($scope, $location, batchesAPI, authInfo){
    $scope.dt = new Date();
    $scope.minDate = new Date();
    $scope.processing = false;
    
    $scope.today = function(){
        $scope.dt = new Date();
    };
    $scope.clear = function(){
        $scope.dt = null;
    };
    $scope.create = function(){
        $scope.processing = true;
        
        var batchObj = {};
        batchObj.fileID = null;
        batchObj.name = $scope.name;
        batchObj.dateAdded = new Date();
        batchObj.creator = authInfo.email;
        batchObj.dateDue = $scope.dt;
        batchObj.users = null;
        
        batchesAPI.create(authInfo.token, batchObj).success(function(res){
            $scope.processing = false;
            $location.path('/batches/');
        });
    };
}]);