var app = angular.module('noshed.controllers', ['ionic', 'noshed.config']);

var areaChangedEvent = 'area-changed';
var gotAreasEvent = 'got-areas';
var gotStageEvent = 'got-status';
var gotScheduleEvent = 'got-schedule';

app.service('AreaService', function($http, $rootScope, noshedConfig) {
    this.day = new Date().getDate();
    this.currentArea = window.localStorage['area'];
    this.stage = -1;
    this.allAreas = [];
    this.schedule = [];

    this.setArea = function(areaId) {
        console.log('$broadcast areaChanged to ' + areaId);
        $rootScope.$broadcast(areaChangedEvent, areaId);
        this.currentArea = areaId;
       	window.localStorage["area"] = areaId;
    };

    this.getStage = function() {
		// expect { 'status': 1 }
		var url = noshedConfig.serverUrl + '/status';
        $http.get(url)
            .success(function(data, status, headers, config) {
                console.log("Got status from server: " + JSON.stringify(data));
                this.stage = data.status;
				$rootScope.$broadcast(gotStageEvent, {'success': true, 'status': data.status});
            }).
            error(function(data, status, headers, config) {
                $rootScope.$broadcast(gotStageEvent, {'success': false, 'message': data.error});
            });
    };
    
    this.getAreas = function() {
		// expect [1, 2, 3, ...]
		var url = noshedConfig.serverUrl + '/areas/Cape Town';
        console.log("calling " + url);
        $http.get(url)
            .success(function(data, status, headers, config) {
                this.allAreas = data;
				$rootScope.$broadcast(gotAreasEvent, data);
            }).
            error(function(data, status, headers, config) {
                $rootScope.$broadcast(gotAreasEvent, data);
            });
    };
    
    this.getSchedule = function(day, stage, area) {
        // expect [{"startTime": "00:00", "endTime": "02":00}, ...]
        var url = noshedConfig.serverUrl + '/schedule/' + day + "/" + stage + "/" + area;
        console.log("calling " + url);
        $http.get(url)
            .success(function(data, status, headers, config) {
                console.log("Got schedule from server: " + JSON.stringify(data));
                this.schedule = data;
				$rootScope.$broadcast(gotScheduleEvent, data);
            }).
            error(function(data, status, headers, config) {
                $rootScope.$broadcast(gotScheduleEvent, []);
            });
    };
});

app.controller('AreaCtrl', function($rootScope, $scope, AreaService){
    
    $scope.allAreas = [];
    
    $scope.getAreas = function() {
        console.log('getting areas from AreaCtrl');
        AreaService.getAreas();
    };

    $scope.changeArea = function(area) {
        AreaService.setArea(area);
    };
    
    $rootScope.$on(gotAreasEvent, function (event, result) {
        $scope.allAreas = result;
    });
});

app.controller('StatusCtrl', function($rootScope, $scope, $ionicLoading, AreaService) {
    
    $scope.day = AreaService.day;
    $scope.stage = AreaService.stage;
    $scope.currentArea = AreaService.currentArea;
	$scope.message = "";
	$scope.statusStyle = {};
    $scope.schedule = [];
		
	$scope.init = function() {
		var isAreaSet = $scope.currentArea !== null;
		if (isAreaSet){
			console.log("Current area: " + $scope.currentArea);}
		else {
			console.log("Current area not set");
		}
		$scope.getStage();
	};
	
	$scope.updateMessage = function() {
		if($scope.stage == 0) {
			$scope.message = "There is no loadshedding at present" + " in area " + $scope.currentArea;
			$scope.statusStyle = {'background-color':'#BDF4CB'};
		}
		else if($scope.stage > 0){
			$scope.message = "Stage " + $scope.stage + " in area " + $scope.currentArea;
			$scope.statusStyle = {'background-color':'#FFB5B5'};
		}
	};
		
    // gets the current loadshedding status
    $scope.getStage = function() {
				$ionicLoading.show({
          template: 'Loading...'
        });
        AreaService.getStage();
    };
  
    // when loadshedding status is fetched
    $rootScope.$on(gotStageEvent, function (event, result) {
		$ionicLoading.hide();
		
		if(result.success == true) {
        	$scope.stage = result.status;
		}
        else {
			$scope.stage = -1;
			$scope.message = "Error from server: " + result.message;
			$scope.statusStyle = {'background-color':'#FFD9B7'};
		}
		$scope.updateMessage();
        $scope.getSchedule($scope.day, $scope.stage, $scope.currentArea);
    });
    
    // gets the current loadshedding status
    $scope.getSchedule = function(day, stage, area) {
				$ionicLoading.show({
          template: 'Loading...'
        });
        AreaService.getSchedule(day, stage, area);
    };
    
    // when schedule is fetched
    $rootScope.$on(gotScheduleEvent, function (event, result) {
        $scope.schedule = [];
        for (var index = 0; index < result.length; index++) {
            var element = result[index];
            $scope.schedule.push({"startTime": formatDateString(element.startTime),
                                  "endTime": formatDateString(element.endTime)});
        }
		$ionicLoading.hide();
    });

    // when the user changes area
    $rootScope.$on(areaChangedEvent, function (event, message) {
        $scope.currentArea = message;
		$scope.updateMessage();
        $scope.getSchedule($scope.day, $scope.stage, $scope.currentArea);
    });
});

var formatDateString = function(str){
    var date = new Date(str);
    var hours = date.getHours().toString();
    var mins = date.getMinutes().toString();
    if(mins.toString().length == 1)
        mins += "0";
    return hours + ":" + mins;
};