var batches = angular.module('batchesControllers', ['batchesFactory']);

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
        addUsers: function(batchObj){
            $location.path('/batches/' + batchObj.batchID + '/add/users');   
        }
    };
}]);

batches.controller('batchViewCtrl', ['$scope', '$location', 'batchesAPI', 'authInfo', function($scope, $location, batchesAPI, authInfo){
    // load the current users assigned to this batch.
    // load the documents assigned to this batch.
    // or load all documents and mark those that have been assigned to current batch.
}]);

batches.controller('batchAddUsersCtrl', ['$scope', '$location', 'batchesAPI', 'authInfo', function($scope, $location, batchesAPI, authInfo){
    // do work.
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