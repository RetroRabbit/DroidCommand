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

}]);