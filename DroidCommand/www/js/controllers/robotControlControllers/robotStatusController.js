angular.module('driodCommand')
.controller('RobotStatusController', ['$scope', '$location', '$http', '$state', '$timeout', 'droidService', function ($scope, $location, $http, $state, $timeout, droidService) {

    droidService.initialiseDroids($scope.getDeviceList(), $scope.getConnectedDeviceInfo());

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
        $scope.connect($scope.getSelectedDroid());;
    }

    $scope.selectRobotRight = function () {

        $scope.startAutomonousBehaviour($scope.getSelectedDroid());

        droidService.nextDroid();

        $scope.stopAutomonousBehaviour($scope.getSelectedDroid());

        //connect to selected robot
        $scope.connect($scope.getSelectedDroid());
    }

    $scope.selectAllRobots = function () {
        //$scope.selectedDroidPosition = 0;
        //$scope.activeDroid = $scope.allDroid;
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

    //starts automonous behaviour for a selected droid. calls a timeout to send commands to the control pipeline
    $scope.startAutomonousBehaviour = function (droid) {

        if (droid.AutonomousBehaviour == null) {
            droid.AutonomousBehaviour = $scope.createDefaultBehaviour();
        }

        droid.Mode = 'Autonomous';
        $scope.StartCommandExecutionInterval();
        droid.BehaviourTimer = $timeout(function () { timeoutCommandPipingFunction(droid, 0) }, 10);

    }

    //cancels automonous behaviour for a selected droid. cancels the current timeout on the droids behaviour
    $scope.stopAutomonousBehaviour = function(droid) {
        droid.Mode = 'Manual';
        if (droid.BehaviourTimer) {
            $timeout.cancel(droid.BehaviourTimer);
            droid.BehaviourTimer = null;
        }
    }

    function timeoutCommandPipingFunction(droid, iteration)
    {
        //send command to the command pipe
        $scope.commandQueue.push({ command: $scope.wrapFunction(droid.AutonomousBehaviour[iteration].command, this, droid.AutonomousBehaviour[iteration].params), droid: droid });

        //iterate to the next method in the array
        iteration++;
        if (iteration >= droid.AutonomousBehaviour.length) {
            iteration = 0;
        }
        //call the next method in the AutonomousBehaviour array via a timeout when the current method is done executing on the device
        droid.BehaviourTimer = $timeout(function () { timeoutCommandPipingFunction(droid, iteration) }, droid.AutonomousBehaviour[iteration].duration);
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