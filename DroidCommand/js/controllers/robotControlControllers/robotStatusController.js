angular.module('driodCommand')
.controller('RobotStatusController', ['$scope', '$location', '$http', function ($scope, $location, $http) {


    $scope.nameOrSensors = "Sensors";
    $scope.robotName = "robocop";

    $scope.robotEmotion = "happy";
    $scope.getRobotEmotion = function ()
    {
        return $scope.robotEmotion;
    }

    $scope.happinessPercentage = 60;
    $scope.getHappinessPercentage = function () {
        return $scope.happinessPercentage;
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

    $scope.isControlMode = function (controlMode)
    {
        if ($scope.getControlMode() === controlMode) {
            return true;
        }
        return false;
    }

    // end of todo

    $scope.checkRobotEmotion = function (emotion) {
       return $scope.getRobotEmotion() === emotion;
    }

    //add detection
    $scope.isRobotDetected = function ()
    {
        return false;
        $scope.nameOrSensors = "Sensors"
    }


    $scope.selectRobotLeft = function()
    {
        alert("left");
    }

    $scope.selectRobotRight = function ()
    {
        alert("right");
    }

    $scope.selectAllRobots = function () {
        alert("All Robots");
    }

    $scope.selectSettings = function () {
        alert("Settings");
    }

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