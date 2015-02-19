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
        bluetoothService.connect(device.address);
    }

    $scope.disconnect = function () {
        bluetoothService.disconnect();
    }

    //starts scanning for devices
    $scope.scanForDevices = function () {
        bluetoothService.DetectDevices();
    }

    $scope.getDeviceList = function () {

        return bluetoothService.getDevicelist();
    }

    $scope.getFeedback = function () {
        return bluetoothService.getFeedback();
    }



    }]);