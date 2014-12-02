var batches = angular.module('batchesControllers', ['batchesFactory']);

batches.controller('batchesCtrl', ['$scope', 'batchesAPI', 'authInfo', function($scope, batchesAPI, authInfo){
    $scope.gridOptions = {
        enableSorting: true,
        enableRowSelection: true,
        multiSelect: true,
        columnDefs: [
            { name: 'Created By', field: 'creator' },
            { name: 'Date Added', field: 'dateAdded' },
            { name: 'Date Due', field: 'dateDue' }
        ]
    };
    
    batchesAPI.getAll(authInfo.token).success(function(res){
        $scope.gridOptions.data = res;
    });
}]);

batches.controller('createBatchCtrl', ['$scope', '$location', 'batchesAPI', 'authInfo', function($scope, $location, batchesAPI, authInfo){
    $scope.dt = new Date();
    $scope.minDate = new Date();
    
    $scope.today = function(){
        $scope.dt = new Date();
    };
    $scope.clear = function(){
        $scope.dt = null;
    };
    $scope.create = function(){
        var batchObj = {};
        batchObj.fileID = null;
        batchObj.name = $scope.name;
        batchObj.dateAdded = new Date();
        batchObj.creator = authInfo.email;
        batchObj.dateDue = $scope.dt;
        batchObj.users = null;
        
        batchesAPI.create(authInfo.token, batchObj).success(function(res){
            $location.path('/batches/');
        });
    };
}]);