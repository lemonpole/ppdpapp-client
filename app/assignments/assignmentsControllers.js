var acct = angular.module('assignmentsControllers', ['assignmentsFactory']);

acct.controller('assignmentsCtrl', ['$scope', 'assignmentsAPI', 'authInfo', function($scope, assignmentsAPI, authInfo){
	// assignments page will be the home page.
	// if an administrator, show all assignments.
	// otherwise, show assignments pertaining to current user.
	$scope.assignments = null;
    
    assignmentsAPI.getAll(authInfo.token).success(function(res){
      $scope.assignments = res;  
    });
}]);