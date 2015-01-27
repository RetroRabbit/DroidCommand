angular.module('driodCommand')
.controller('JoystickController', ['$scope', '$location', '$http', function ($scope, $location, $http) {

    $scope.controlSelected = "joystick";
    $scope.getControlSelected = function () {
        return $scope.controlSelected;
    }

    $scope.isControlSelected = function (controlType) {
        return $scope.getControlSelected() === controlType;
    }

    $scope.clickTop = function ()
    {
        return "Top";
    }

    $scope.clickLeft = function ()
    {
        return "Left";
    }

    $scope.clickRight = function ()
    {
        return "Right";
    }

    $scope.clickBottom = function ()
    {
        return "Bottom";
    }

    $scope.clickMoreCommands = function ()
    {
        return "More";
    }

    $scope.clickspinCommand = function ()
    {
        return "Spin";
    }

    $scope.clickWaggleCommand = function ()
    {
        return "Waggle";
    }

    $scope.clickShootCommand = function ()
    {
        return "Shoot";
    }



}]);