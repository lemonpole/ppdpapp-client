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
files.controller('fileCreateCtrl', ['$scope', '$upload', 'filesAPI', 'tablesAPI', 'authInfo', function($scope, $upload, filesAPI, tablesAPI, authInfo){
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
	
	$scope.onFileSelect = function($files){
		// build objects i will pass.
		
		for(var i=0; i<$files.length; i++){
			var file = $files[i];
			$upload.upload({
				url: 'http://js.localhost/ppdpapp-client/#/files/create',
				data: {file: file}
			}).progress(function(evt){
				$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
			}).success(function(data, status, headers, config){
				console.log('darude');
			});
		}
	};
}]);