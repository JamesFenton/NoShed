var app = angular.module('noshed-history', ['noshed.config']);

app.controller('history-ctrl', function($scope, $http, noshedConfig){
	$scope.data = [];
	
	$scope.init = function(){
		$scope.loadHistory();
	}
	
	$scope.loadHistory = function(){
		var serverUrl = noshedConfig.serverUrl;
		$http.get(serverUrl + '/history/data')
            .success(function(data, status, headers, config) {
                console.log("Got status from server: " + JSON.stringify(data));
                $scope.data = data;
            }).
            error(function(data, status, headers, config) {
                console.log("Error");
            });
	}
});