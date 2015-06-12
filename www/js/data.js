var app = angular.module('noshed-data', ['noshed.config']);

app.controller('data-ctrl', function($scope, $http, noshedConfig){
	$scope.data = [];
	
	$scope.init = function(){
		$scope.loadHistory();
	}
	
	$scope.loadHistory = function(){
		var serverUrl = noshedConfig.serverUrl;
		$http.get(serverUrl + '/data/history')
            .success(function(data, status, headers, config) {
                console.log("Got status from server: " + JSON.stringify(data));
                $scope.data = data;
            }).
            error(function(data, status, headers, config) {
                console.log("Error");
            });
	}
});