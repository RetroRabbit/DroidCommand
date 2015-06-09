angular.module('driodCommand')
.controller('RobotStatusController', ['$scope', '$location', '$http', '$state', 'droidService', function ($scope, $location, $http, $state, droidService) {

    droidService.initialiseDroids($scope.getDeviceList());

    $scope.getDroidList = function () {
        return droidService.getDroids();
    }


    $scope.getSelectedDroid = function () {
        return droidService.getActiveDroid();
    }

    //default to sensors
    $scope.nameOrSensors = "Sensors";


    $scope.getRobotEmotion = function ()
    {
        if ($scope.getSelectedDroid().EmotionLevel <= 30) {
            return "sad";
        }
        else if ($scope.getSelectedDroid().EmotionLevel <= 60)
        {
            return "neutral";
        }
        else
        {
            return "happy";
        }
    }

    $scope.checkRobotEmotion = function (emotion) {
        return $scope.getRobotEmotion() === emotion;
    }

    $scope.getHappinessPercentage = function () {
        return $scope.getSelectedDroid().EmotionLevel;
    }

    $scope.getBatteryPercentage = function () {
        return $scope.getSelectedDroid().Battery;
    }

    $scope.selectRobotLeft = function () {
        droidService.previousDroid();

        //connect to selected robot
        $scope.connect($scope.getSelectedDroid);
    }

    $scope.selectRobotRight = function () {
        droidService.nextDroid();

        //connect to selected robot
        $scope.connect($scope.getSelectedDroid);
    }

    $scope.selectAllRobots = function () {
        $scope.selectedDroidPosition = 0;
        $scope.activeDroid = $scope.allDroid;
    }

    $scope.selectSettings = function () {
        alert("Settings");
    }

    //todo get this from parent
    $scope.controlMode = "drive";
    $scope.getControlMode = function()
    {
        return $scope.controlMode;
    }

    $scope.setControlMode = function (newControlMode) {
        $scope.controlMode = newControlMode;
    }

    $scope.navigateBetweenModes = function(mode)
    {
        if (mode == "drive") {
            $scope.setControlMode("drive");
            $scope.navigateBetweenControls($scope.getControlSelected());
        }
        else
        {
            $scope.setControlMode("program");
            $state.go('robotControl.program');
        }
    }

    $scope.isMode = function (controlMode)
    {
        if ($scope.getControlMode() === controlMode) {
            return true;
        }
        return false;
    }

    // end of todo

    //add detection
    $scope.isRobotDetected = function ()
    {
        return false;
        $scope.nameOrSensors = "Sensors"
    }


//

    function refreshSwatch(ev, ui) {
        var red = $scope.colorpicker.red,
            green = $scope.colorpicker.green,
            blue = $scope.colorpicker.blue;
        var color = '#' + hexFromRGB(red, green, blue);
        angular.element('#swatch').css('background-color', color);
    }

    // Slider options with event handlers
    $scope.slider = {
        'options': {
            start: function (event, ui) { $log.info('Event: Slider start - set with slider options', event); },
            stop: function (event, ui) { $log.info('Event: Slider stop - set with slider options', event); }
        }
    }

    $scope.demoVals = {
        sliderExample3: 14,
        sliderExample4: 14,
        sliderExample5: 50,
        sliderExample8: 0.34,
        sliderExample9: [-0.52, 0.54],
        sliderExample10: -0.37
    };

    $scope.colorpicker = {
        red: 255,
        green: 140,
        blue: 60,
        options: {
            orientation: 'horizontal',
            min: 0,
            max: 255,
            range: 'min',
            change: refreshSwatch,
            slide: refreshSwatch
        }
    };

}]);