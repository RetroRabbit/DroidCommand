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

    $scope.clickJoystickLeft = function () {
        bluetoothService.sendMessage({ "message": "left", "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e" });
    }

    $scope.clickJoystickRight = function () {
        bluetoothService.sendMessage({ "message": "right", "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e" });
    }
    //({ "message": "left", "serviceUuid": "1800", "characteristicUuid": "2a00" });
    // "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e" }
    $scope.clickJoystickTop = function () {
        bluetoothService.sendMessage({ "message": "up", "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e" })
    }

    $scope.clickJoytickBottom = function () {
        bluetoothService.sendMessage({ "message": "down", "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e" })
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