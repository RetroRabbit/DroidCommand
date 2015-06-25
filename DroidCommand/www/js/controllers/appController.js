angular.module('driodCommand')
.controller('appController', ['$scope', '$rootScope', '$location', '$http', '$state', 'bluetoothService', 'droidService', function ($scope, $rootScope, $location, $http, $state, bluetoothService, droidService) {

    //THIS IS THE PARENT CONTROLLER FOR THE APP.
    //ALL BLUETOOTH DEVICE CONTROL SHOULD HAPPEN HERE
    $scope.devicelist = bluetoothService.getDevicelist();

    //connects to a device
    //if previous already connected it will reconnect instead
    $scope.connect = function (device) {

        //if device is already discovered just reconnect, if current device is connected device do nothing
        if (bluetoothService.isDeviceDiscovered(device.address)) {

            if(bluetoothService.getConnectedDeviceInfo().address == device.address)
            {
                return;
            }

            bluetoothService.disconnect(device.address, function (obj) {
                bluetoothService.reconnect(device.address, function (obj) {
                    bluetoothService.setConnectedDeviceInfo(device.info);
                }, bluetoothService.reconnectError);
            }, bluetoothService.disconnectError);

        }
        else {
            bluetoothService.connect(device.address);
        }

    }

    //reconnects to a device and then executes a command
    $scope.reconnectAndExecuteCommand = function (device, command) {


        //if device is already discovered just reconnect, if current device is connected device do nothing
        if (bluetoothService.isDeviceDiscovered(device.address) ) {

            //if this device is the currently connected device just execute the command
            if (bluetoothService.getConnectedDeviceInfo().address == device.address) {
                //execute a command
                (command)();
                
            }
            else
            {
                //disconnect from current device
                bluetoothService.disconnect(device.address, function (obj) {
                    //then reconnect to the new device
                    bluetoothService.reconnect(device.address, function (obj) {

                        //set the device to the correct connected device
                        bluetoothService.setConnectedDeviceInfo(device.info);
                        //execute a command
                        (command)();
                        
                    }, bluetoothService.reconnectError);
                }, bluetoothService.disconnectError);
            }

        }
    }

    $scope.disconnect = function () {
        bluetoothService.disconnect();
    }

    //starts scanning for devices
    $scope.scanForDevices = function () {
        bluetoothService.DetectDevices();
    }

    $scope.getDeviceList = function () {

        $scope.devicelist = bluetoothService.getDevicelist();

        return $scope.devicelist;
    }

    $scope.getConnectedDeviceInfo = function ()
    {

        return bluetoothService.getConnectedDeviceInfo();
    }

    $scope.getFeedback = function () {
        return bluetoothService.getFeedback();
    }

    //execution checking variable // maybe move this later
    $scope.isFreeToExecute = function () {
        return bluetoothService.isFreeToExecute();
    }

    $scope.setFreeToExecute = function (sFreeToExecute) {
        return bluetoothService.setFreeToExecute(sFreeToExecute);
    }

    $scope.getDroidList = function () {
        return droidService.getDroids();
    }

    $scope.getSelectedDroid = function () {
        return droidService.getActiveDroid();
    }


}]);