var app = angular.module('starter.controllers', ['ionic']);

var areaChangedEvent = 'area-changed';
var gotStatusEvent = 'got-status';

app.service('AreaService', function($http, $rootScope) {
    this.currentArea = window.localStorage.getItem("area");

    this.currentStatus = -1;

    this.allAreas = ["1", "2", "3", "4"];

    this.setArea = function(areaId) {
        console.log('$broadcast areaChanged to ' + areaId);
        $rootScope.$broadcast(areaChangedEvent, areaId);
        this.currentArea = areaId;
        window.localStorage.setItem("area", areaId);
    };

    this.getStatus = function() {

				// expect { 'data': 1 }
        $http.get('http://noshedserver-dev.azurewebsites.net/status') 
            .success(function(data, status, headers, config) {
                console.log("Got status from server: " + JSON.stringify(data));
                this.currentStatus = data.status;
                $rootScope.$broadcast(gotStatusEvent, data.status);
            }).
            error(function(data, status, headers, config) {
                console.log("Failure: " + status + ". Data: " + data);
            });
    };
});

app.controller('SearchCtrl', function($scope, AreaService){
    
    $scope.allAreas = AreaService.allAreas;

    $scope.changeArea = function(area) {
        AreaService.setArea(area);
    };
});

app.controller('StatusCtrl', function($rootScope, $scope, $ionicLoading, AreaService) {
    
    $scope.currentArea = AreaService.currentArea;
    $scope.currentStatus = AreaService.currentStatus;
		
		$scope.init = function() {
			var isAreaSet = $scope.currentArea !== null;
			if (isAreaSet){
				console.log("Current area: " + $scope.currentArea);}
			else {
				console.log("Current area not set");
			}
			$scope.getStatus();
		};
		
    // gets the current loadshedding status
    $scope.getStatus = function() {
				window.localStorage.clear();
        $ionicLoading.show({
          template: 'Loading...'
        });
        AreaService.getStatus();
    };
  
    // when loadshedding status is fetched
    $rootScope.$on(gotStatusEvent, function (event, message) {
        $scope.currentStatus = message;
        $ionicLoading.hide();
    });

    // when the user changes area
    $rootScope.$on(areaChangedEvent, function (event, message) {
        $scope.currentArea = message;
    });
});
