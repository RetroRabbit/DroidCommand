angular.module('driodCommand')
.controller('appController', ['$scope', '$rootScope', '$location', '$http', '$state','$interval', 'bluetoothService', 'droidService', function ($scope, $rootScope, $location, $http, $state, $interval, bluetoothService, droidService) {

    //THIS IS THE PARENT CONTROLLER FOR THE APP.
    //ALL BLUETOOTH DEVICE CONTROL SHOULD HAPPEN HERE
    $scope.devicelist = bluetoothService.getDevicelist();
    //
    $scope.feedback = bluetoothService.getFeedback();

    //connects to a device
    //if previous already connected it will reconnect instead
    $scope.connect = function (device) {

        //if device is already discovered just reconnect, if current device is connected device do nothing
        if (bluetoothService.isDeviceDiscovered(device.address)) {

            if (bluetoothService.getConnectedDeviceInfo().address == device.address) {
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
        if (bluetoothService.isDeviceDiscovered(device.address)) {

            //if this device is the currently connected device just execute the command
            if (bluetoothService.getConnectedDeviceInfo().address == device.address) {
                //execute a command
                (command)();

            }
            else {
                //disconnect from current device
                //bluetoothService.disconnect(device.address, function (obj) {
                //then reconnect to the new device
                //  bluetoothService.reconnect(device.address, function (obj) {

                //set the device to the correct connected device
                bluetoothService.setConnectedDeviceInfo(device.info);
                //execute a command
                (command)();

                //}, bluetoothService.reconnectError);
                //}, bluetoothService.disconnectError);
            }

        }
    }

    $scope.disconnect = function () {
        bluetoothService.disconnect();
    }

    //starts scanning for devices
    $scope.scanForDevices = function () {
        bluetoothService.DetectDevices();

        //start update interval
        $scope.startConnectionUpdate();
    }

    $scope.getDeviceList = function () {

        $scope.devicelist = bluetoothService.getDevicelist();

        return $scope.devicelist;
    }

    $scope.getConnectedDeviceInfo = function () {

        return bluetoothService.getConnectedDeviceInfo();
    }

    $scope.getFeedback = function () {
        $scope.feedback = bluetoothService.getFeedback();
        return $scope.feedback;
    }

    //
    $scope.commandQueue = [];
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


    //interval to handle update of devices and connection data
    $scope.ConnectionUpdateInterval = null;
    $scope.startConnectionUpdate = function () {
        if ($scope.ConnectionUpdateInterval == null) {
            $scope.ConnectionUpdateInterval = $interval($scope.UpdateConnectionInfo, 1000);
        }
    }
    //update the scope with new connection info
    $scope.UpdateConnectionInfo = function () {
        $scope.getDeviceList();
        $scope.getFeedback();
         
        //$scope.$apply();
    }

    //client side to check if device has been discovered at least once
    $scope.IsDiscovered = function (device)
    {
        if (device.info != null) {
            return true;
        }
        return false;
    }
    

    //destroy intervals and timeouts
    $scope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams) {

        if ($scope.DifferentialMovementInterval != null) {
            $interval.cancel($scope.DifferentialMovementInterval);
            $scope.DifferentialMovementInterval = null;
        }
        //set free to execute to true
        $scope.setFreeToExecute(true);
    });



}]);