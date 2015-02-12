angular.module('driodCommand')
.controller('MainController', ['$scope', '$location', '$http', '$state', 'bluetoothService', function ($scope, $location, $http, $state, bluetoothService) {

    $scope.navigate = function (destination) {
        if (destination == 'pair') {
            $state.go('odyssey.bluetoothSelection');
        }
        else
        {
            alert(destination);
        }
    }

    $scope.connect = function (device) {
        bluetoothService.ConnectToDevice(device);
    }

    $scope.disconnect = function () {
        bluetoothService.CloseConnectionToDevice();
    }

    $scope.getDeviceList = function () {
        if(bluetoothService.deviceList.length == 0)
        bluetoothService.DetectDevices();

        return bluetoothService.deviceList;
    }

    $scope.getFeedback = function () {
        return bluetoothService.feedback;
    }



    }]);