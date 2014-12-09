var files = angular.module('filesControllers', ['filesFactory']);

files.controller('filesCtrl', ['$scope', '$location', 'filesAPI', 'authInfo', function($scope, $location, filesAPI, authInfo){
    $scope.gridOptions = {
        enableSorting: true,
        enableRowSelection: true,
        enableSelectAll: true,
        multiSelect: true,
        columnDefs: [
            { name: 'ID', field: 'fileID' },
            { name: 'Creator', field: 'creator' },
            { name: 'dateAdded', field: 'dateAdded' },
            { name: 'View', cellTemplate: 'app/files/partials/cellTemplate_files.html' }
        ]
    };
    $scope.loaded = false;
    $scope.requestFailed = false;
    
    $scope.reloadFiles = function(){
		filesAPI.getAll(authInfo.token).success(function(res){
			$scope.gridOptions.data = res;
			$scope.loaded = true;
			$scope.requestFailed = false;
		}).error(function() {
			$scope.loaded = false;
			$scope.requestFailed = true;
		});
	};
	$scope.reloadFiles();
	
	$scope.gridScope = {
        viewUsers: function(fileObj){
			// get the batch_id this file belongs to. load that bitch up.
			filesAPI.findBatch(authInfo.token, fileObj.fileID).success(function(res){
				console.log(res);
				//$location.path('/batches/' + res.batchID + '/view/users');
			});
        }
    };
}]);
files.controller('fileCreateCtrl', ['$scope', 'filesAPI', function($scope, filesAPI){
}]);