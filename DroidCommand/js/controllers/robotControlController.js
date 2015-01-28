angular.module('driodCommand')
.controller('RobotControlController', ['$scope', '$location', '$http', '$state', function ($scope, $location, $http, $state) {

    $scope.viewName = "";
    $scope.getViewName = function () {
        return $scope.viewName;
    }

    $scope.controlSelected = "";
    $scope.getControlSelected = function () {
        return $scope.controlSelected;
    }
    $scope.setControlSelected = function (newControl) {
        $scope.controlSelected = newControl;
    }

    $scope.navigateBetweenControls = function (newControl) {
        $scope.setControlSelected(newControl);
        $state.go('robotControl' + newControl);
    }

    $scope.isControlSelected = function (controlType) {
        //return $location.path().indexOf(viewLocation) > -1;
        return $scope.getControlSelected() === controlType;
    }

    /*Joystick Specific Methods*/
    $scope.clickJoystickTop = function () {
        return "Top";
    }

    $scope.clickJoystickLeft = function () {
        return "Left";
    }

    $scope.clickJoystickRight = function () {
        return "Right";
    }

    $scope.clickJoytickBottom = function () {
        return "Bottom";
    }
    //

    /*Differential Specific Methods*/
    $scope.clickDifferentialLeftForward = function () {
        alert("clickDifferentialLeftForward");
    }

    $scope.clickDifferentialLeftReverse = function () {
        alert("clickDifferentialLeftReverse");
    }

    $scope.clickDifferentialRightReverse = function () {
        alert("clickDifferentialRightReverse");
    }

    $scope.clickDifferentialRightForward = function () {
        alert("clickDifferentialRightForward");
    }

    //

    /*Motion Specific Methods*/

    //

    /*Robot Command Methods*/
    $scope.clickMoreCommands = function () {
        alert("More");
    }

    $scope.clickspinCommand = function () {
        alert("Spin");
    }

    $scope.clickWaggleCommand = function () {
        alert("Waggle");
    }

    $scope.clickShootCommand = function () {
        alert("Shoot");
    }

    $scope.clickRecoilCommand = function () {
        alert("Recoil");
    }

    $scope.clickDanceCommand = function () {
        alert("Dance");
    }
    //

}]);