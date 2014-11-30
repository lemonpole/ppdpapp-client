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

batches.controller('createBatchCtrl', ['$scope', 'batchesAPI', 'authInfo', function($scope, batchesAPI, authInfo){
    // name of batch
    // type of batch
    // date due
}]);