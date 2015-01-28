angular.module('driodCommand')
.controller('RobotControlController', ['$scope', '$location', '$http', function ($scope, $location, $http) {

    $scope.viewName = "robotControl";
    $scope.getViewName = function () {
        return $scope.viewName;
    }

    $scope.controlSelected = "joystick";
    $scope.getControlSelected = function () {
        return $scope.controlSelected;
    }

    $scope.isControlSelected = function (controlType) {
        return $location.path().indexOf(viewLocation) > -1;
        //return $scope.getControlSelected() === controlType;
    }

    $scope.clickTop = function () {
        return "Top";
    }

    $scope.clickLeft = function () {
        return "Left";
    }

    $scope.clickRight = function () {
        return "Right";
    }

    $scope.clickBottom = function () {
        return "Bottom";
    }


    /*Command Methods*/
    $scope.clickMoreCommands = function () {
        return "More";
    }

    $scope.clickspinCommand = function () {
        return "Spin";
    }

    $scope.clickWaggleCommand = function () {
        return "Waggle";
    }

    $scope.clickShootCommand = function () {
        return "Shoot";
    }


}]);