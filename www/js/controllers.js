var app = angular.module('noshed.controllers', ['ionic', 'noshed.config']);

var areaChangedEvent = 'area-changed';
var gotStatusEvent = 'got-status';

app.service('AreaService', function($http, $rootScope, noshedConfig) {
    this.currentArea = window.localStorage['area'];

    this.currentStatus = -1;

    this.allAreas = ["1", "2", "3", "4"];

    this.setArea = function(areaId) {
        console.log('$broadcast areaChanged to ' + areaId);
        $rootScope.$broadcast(areaChangedEvent, areaId);
        this.currentArea = areaId;
       	window.localStorage["area"] = areaId;
    };

    this.getStatus = function() {

		// http://noshedserver-dev.azurewebsites.net/status
		// expect { 'status': 1 }
		var serverUrl = noshedConfig.serverUrl;
		console.log('connecting to ' + serverUrl);
        $http.get(serverUrl + '/status')
            .success(function(data, status, headers, config) {
                console.log("Got status from server: " + JSON.stringify(data));
                this.currentStatus = data.status;
				$rootScope.$broadcast(gotStatusEvent, {'success': true, 'status': data.status});
            }).
            error(function(data, status, headers, config) {
                $rootScope.$broadcast(gotStatusEvent, {'success': false, 'message': data.error});
            });
    };
});

app.controller('AreaCtrl', function($scope, AreaService){
    
    $scope.allAreas = AreaService.allAreas;

    $scope.changeArea = function(area) {
        AreaService.setArea(area);
    };
});

app.controller('StatusCtrl', function($rootScope, $scope, $ionicLoading, AreaService) {
    
    $scope.currentArea = AreaService.currentArea;
    $scope.currentStatus = AreaService.currentStatus;
	$scope.message = "";
	$scope.statusStyle = {};
		
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
				$ionicLoading.show({
          template: 'Loading...'
        });
        AreaService.getStatus();
    };
	
	$scope.updateMessage = function() {
		if($scope.currentStatus == 0) {
			$scope.message = "There is no loadshedding at present" + " in area " + $scope.currentArea;
			$scope.statusStyle = {'background-color':'#BDF4CB'};
		}
		else if($scope.currentStatus > 0){
			$scope.message = "Stage " + $scope.currentStatus + " in area " + $scope.currentArea;
			$scope.statusStyle = {'background-color':'#FFB5B5'};
		}
	};
  
    // when loadshedding status is fetched
    $rootScope.$on(gotStatusEvent, function (event, result) {
		$ionicLoading.hide();
		
		if(result.success == true) {
        	$scope.currentStatus = result.status;
		}
        else {
			$scope.currentStatus = -1;
			$scope.message = "Error from server: " + result.message;
			$scope.statusStyle = {'background-color':'#FFD9B7'};
		}
		$scope.updateMessage();
    });

    // when the user changes area
    $rootScope.$on(areaChangedEvent, function (event, message) {
        $scope.currentArea = message;
		$scope.updateMessage();
    });
});
