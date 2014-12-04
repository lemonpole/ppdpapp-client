var newsclips = angular.module('newsclipsControllers', ['newsclipsFactory']);

newsclips.controller('newsclipsCtrl', ['$scope', 'newsclipsAPI', 'authInfo', function($scope, newsclipsAPI, authInfo){
    $scope.gridNewsclips = {
        enableRowSelection: true,
        enableSelectAll: true,
        multiSelect: true,
        columnDefs: [
            { field: 'Headline' },
            { field: 'Abstract' },
            { name: 'Newsclip Date', field: 'Date' }
        ]
    };
    
    newsclipsAPI.getAll(authInfo.token).success(function(res){
        $scope.gridNewsclips.data = res;
    });
    
    $scope.gridNewsclips.onRegisterApi = function(gridApi){ 
        $scope.gridApi = gridApi;
    };
    $scope.myFunc = function(){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        
        for(var i=0; i<selectedRows.length; i++){}
    };
}]);