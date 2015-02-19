angular.module('driodCommand')
.controller('RobotControlController', ['$scope', '$location', '$http', '$state', 'bluetoothService', function ($scope, $location, $http, $state, bluetoothService) {

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
        bluetoothService.sendMessage("up");
    }

    $scope.clickJoystickLeft = function () {
        bluetoothService.sendMessage("left");
    }

    $scope.clickJoystickRight = function () {
        bluetoothService.sendMessage("right");
    }

    $scope.clickJoytickBottom = function () {
        bluetoothService.sendMessage("down");
    }
    //

    /*Differential Specific Methods*/
    $scope.clickDifferentialLeftForward = function () {
        bluetoothService.sendMessage("clickDifferentialLeftForward");
    }

    $scope.clickDifferentialLeftReverse = function () {
        bluetoothService.sendMessage("clickDifferentialLeftReverse");
    }

    $scope.clickDifferentialRightReverse = function () {

        bluetoothService.sendMessage("clickDifferentialRightReverse");
    }

    $scope.clickDifferentialRightForward = function () {

        bluetoothService.sendMessage("clickDifferentialRightForward");
    }

    //

    /*Motion Specific Methods*/

    //

    /*Robot Command Methods*/
    $scope.clickMoreCommands = function () {

        bluetoothService.sendMessage("more");
    }

    $scope.clickspinCommand = function () {

        bluetoothService.sendMessage("Spin");
    }

    $scope.clickWaggleCommand = function () {

        bluetoothService.sendMessage("Waggle");
    }

    $scope.clickShootCommand = function () {

        bluetoothService.sendMessage("Shoot");
    }

    $scope.clickRecoilCommand = function () {

        bluetoothService.sendMessage("Recoil");
    }

    $scope.clickDanceCommand = function () {

        bluetoothService.sendMessage("Dance");
    }
    //

}]);