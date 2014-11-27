var nclips = angular.module('newsclipsControllers', ['newsclipsFactory']);

nclips.controller('newsclipsCtrl', ['$scope', 'newsclipsAPI', 'authInfo', function($scope, newsclipsAPI, authInfo){
    $scope.gridNewsclips = {
        enableSorting: true,
        columnDefs: [
            { field: 'Headline' },
            { field: 'Abstract' },
            { name: 'Newsclip Date', field: 'Date' }
        ]
    };
    
    newsclipsAPI.getAll(authInfo.token).success(function(res){
        $scope.gridNewsclips.data = res;
    });
}]);