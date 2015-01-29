angular.module('driodCommand')
.controller('RobotStatusController', ['$scope', '$location', '$http', '$state', function ($scope, $location, $http, $state) {


    $scope.selectedDroidPosition = 0;

    $scope.allDroid = {
        ID: 0,
        Name: 'All',
        Img: 'img/robot.png',
        Mode: 'N/A',
        Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
        Battery: 100,
        EmotionLevel: 100
    };

    //robot data
    $scope.droidList = [
    {
        ID: 1,
        Name: 'Robocop',
        Img: 'img/robot.png',
        Mode: 'Autonomous',
        Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
        Battery: 20,
        EmotionLevel: 80
    },
    {
        ID: 2,
        Name: 'T1000',
        Img: 'img/robot.png',
        Mode: 'Autonomous',
        Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
        Battery: 60,
        EmotionLevel: 20
    },
    {
        ID: 3,
        Name: 'Data',
        Img: 'img/robot.png',
        Mode: 'Autonomous',
        Actions: [{ Name: "Sheila", Img: "img/find.PNG" }, { Name: "Left", Img: "img/left.PNG" }],
        Battery: 95,
        EmotionLevel: 60
    }];

    $scope.getDroidList = function () {
        return $scope.droidList;
    }
    $scope.updateDroidlist = function () {
        //add service here
        $scope.droidList = null;
    }


    $scope.getSelectedDroid = function () {
        return $scope.droidList[$scope.selectedDroidPosition];
    }

    //next droid in the array
    $scope.nextDroid = function () {
        if ($scope.selectedDroidPosition < $scope.droidList.length -1)
            $scope.selectedDroidPosition++;
        $scope.activeDroid = $scope.getSelectedDroid()
    }

    //previous droid in the array droid in the array
    $scope.previousDroid = function () {
        if ($scope.selectedDroidPosition > 0)
            $scope.selectedDroidPosition--;
        else
            $scope.selectedDroidPosition == 0;
        $scope.activeDroid = $scope.getSelectedDroid()
    }

    // Set the activeDroid
    $scope.activeDroid = $scope.getSelectedDroid();
    //default to sensors
    $scope.nameOrSensors = "Sensors";


    $scope.getRobotEmotion = function ()
    {
        if ($scope.activeDroid.EmotionLevel <= 30) {
            return "sad";
        }
        else if ($scope.activeDroid.EmotionLevel <= 60)
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
        return $scope.activeDroid.EmotionLevel;
    }

    $scope.getBatteryPercentage = function () {
        return $scope.activeDroid.Battery;
    }

    $scope.selectRobotLeft = function () {
        $scope.previousDroid();
    }

    $scope.selectRobotRight = function () {
        $scope.nextDroid();
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